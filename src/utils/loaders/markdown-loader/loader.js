const { renderToString } = require( "katex" );
function division( a, b ){
	return ( a - a % b ) / b;
}

function breakstr( str, breaker ){
	for( let index = 0; index < str.length; ++index ){
		if( str[index] == '\\' ){
			++index;
			continue;
		}
		if( str[index] == breaker )
			return [ str.slice( 0, index ), str.slice( index + 1 ) ];
	}
}

class formatError extends Error{

	constructor( received, format ){
		super( `expect format ${ format }, received ${ received }` );
		this.received = received;
		this.format   = format;
	}
}
class timeFormatError extends formatError{

	constructor( received, type ){
		super( received, [ "YYYY-MM-dd", "YYYY-MM-dd~YYYY-MM-dd", "YYYY-MM-dd or YYYY-MM-dd~YYYY-MM-dd" ][ type ]  );
	}

}

function parseTime( time ){

	switch ( time.length ){
	case 10:
		if( time.search( /\d\d\d\d-\d\d-\d\d/ ) )
			throw new timeFormatError( time, 0 );
		return time;
	case 21:
		if( time.search( /~/ ) !== 10 )
			throw new timeFormatError( time, 1 );
		return time;
	default:
		throw new timeFormatError( time, 2 );
	}

}

function encodeText( text ){

	const uibmap = {
		"_": "u",
		"*": "i",
		"^": "b"
	};

	const state = [ ...text ].reduce( function( state, char ){

		if( state.escape )
			return {
				...state,
				current: state.current + char,
				escape : false
			};

		if( char === "\\" )
			if( state.math )
				return {
					...state,
					current: state.current + char
				};
			else
				return {
					...state,
					escape: true
				};

		if( char === "$" )
			if( state.math ) return {
				...state,
				math   : false,
				cached : state.cached + renderToString( state.current ),
				current: ""
			};
			else return {
				...state,
				math   : true,
				cached : state.cached + state.current,
				current: ""
			};

		if( state.math ) return {
			...state,
			current: state.current + char
		};
		else
			if( char in uibmap )
				if( state.uib.at( -1 ) !== char ){
					state.uib.push( char );
					return {
						...state,
						current: `${ state.current }<${ uibmap[char] }>`
					};
				} else {
					state.uib.pop();
					return {
						...state,
						current: `${ state.current }</${ uibmap[char] }>`
					};
				}

		return {
			...state,
			current: state.current + char
		};

	}, {
		math   : false,
		uib    : [],
		escape : false,
		current: "",
		cached : ""
	} );

	if( state.uib.length )
		throw new formatError( `unmatched ${ state.uib }`, "`_`,`*`,`^` to be matched" );
	if( state.math )
		throw new formatError( "otherwise", "`$` to be enclosed" );
	return state.cached + state.current;

}

const { camelCase } = require( "camel-case" );

function parseLine( line ){

	const lineContent = line.trim();
	const indent      = division( line.length - lineContent.length, 4 );

	switch( lineContent[0] ){
	/* eslint-disable no-case-declarations */
	case '!':
		const [ path, caption ] = breakstr( lineContent.slice( 2 ), ']' );
		return {
			indent,
			type   : "image",
			caption: encodeText( caption.slice( 1, -1 ) ),
			path,
			name   : camelCase( path )
		};
	case '+':
		return {
			indent,
			type   : "subtitle",
			content: encodeText( lineContent.slice( 1 ) )
		};
	case '#':
		const [ title, time ] = breakstr( lineContent.slice( 1 ), '#' );
		return {
			indent,
			type   : "title",
			content: encodeText( title ),
			time   : parseTime( time )
		};
	default:
		return {
			indent,
			type   : "text",
			content: encodeText( lineContent )
		};
	/* eslint-enable no-case-declarations */
	}

}

class counter{
	constructor(){
		this.array = [ 0 ];
		this.level = 0;
	}

	count( n ){

		if( n > this.level + 1 )
			throw new Error( "unexpected extra indent" );

		switch( n ){
		case this.level + 1:
			this.array[ ++this.level ] = 1;
			return this;
		case this.level:
			this.array[ this.level ]++;
			return this;
		default:
			this.array[ this.level = n ]++;
			return this;
		}

	}

	toString(){
		let res = "";
		for( let i = 0; i <= this.level; ++i )
			res += this.array[i] + ".";
		return res;
	}
}

module.exports = function parse( source ){
	const state = {
		images: "",
		doc   : [],
	};

	const subtitle = new counter;

	source.split( /\n|\r|\n\r/g ).forEach( function( line, index ){

		if( !line )
			return;

		let result;
		try {
			result = parseLine( line );
		} catch( error ){
			if( error instanceof formatError )
				if( error instanceof timeFormatError )
					throw console.error( `unexpected time format error:\n\tat line ${ 1+index }, expect format ${ error.format }, received ${ error.received }` )
					?? error;
				else
					throw console.error( `unexpected unmatched environment:\n\t at line ${ 1+index }, ${
						error.received !== "otherwise" ? error.received.match( /unmatched (.)/ )[1] : "`$`" } not enclosed` )
					?? error;
			else throw error;
		}

		switch( result.type ){
		case "image":
			state.images += `import ${ result.name } from "${ result.path }";\n`;
			state.doc.push( `<div class="\${names.image}">
				<img src="\${${ result.name }}" />
				<span>${ result.caption }</span>
			</div>` );
			break;
		case "title":
			state.doc.push( `<div class="\${names.title}">
				<h2>${ result.content }</h2>
				<span><i class="fas fa-clock"></i>${ result.time }</span>
			</div>` );
			break;
		case "subtitle":
			subtitle.count( result.indent );
			state.doc.push( `<div class="\${names.subtitle}">${
				`<span class="\${names.subtitle} \${names.indent}"></span>`.repeat( result.indent )
			}<span class="\${names.subtitle} \${names.enumerate}">${ subtitle }</span>
			${ result.content }</div>` );
			break;
		default:
			state.doc.push( `<div class="\${names.plain}">
				${ `<span class="\${names.plain} \${names.indent}"></span>`.repeat( result.indent ) }
				${ result.content }
			</div>` );
		}
	} );

	// console.log( state );

	return `
	import template from "components/markdown";
	const element = new template;
	export default element;
	import names from "components/markdown/index.lmss";
	${ state.images }
	element.$refs.self.innerHTML = \`
	${ state.doc.join( "" ) }
	\`
	`;

};

// const header = `
// import template from "components/markdown";
// const element = new template;
// import names from "components/markdown/index.lmss";
// `;

// test case
// console.log( module.exports(`
// #abc#2024-09-08
// lorem ipsum
// +lorem ipsum
//     lorem ipsum
//     +lorem ipsum
// 	    +lorem ipsum
//     +^lorem ipsum^
// test
// +lorem ipsum
// ![./test.png](test figure caption)
// `) )