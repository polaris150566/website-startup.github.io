import katex from "katex";
const { renderToString } = katex;
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

	constructor( received, format, index, text, uib ){
		super( `expect format ${ format }, received ${ received }` );
		this.received = received;
		this.format   = format;
		this.index    = index;
		this.text     = text;
		this.uib      = uib;
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
	case 0:
		return "";
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

	const state = [ ...text ].reduce( function( state, char, index ){

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
						cached: `${ state.cached }${ state.current }</${ uibmap[char] }>`,
						current: ""
					};
				} else {
					state.uib.pop();
					return {
						...state,
						cached: `${ state.cached }${ state.current }</${ uibmap[char] }>`,
						current: ""
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
		throw new formatError( `unmatched ${ state.uib }`, "`_`,`*`,`^` to be matched", text.length - state.current.length, text, state.uib );
	if( state.math )
		throw new formatError( "otherwise", "`$` to be enclosed", text.length - state.current.length, text );
	return state.cached + state.current;

}

// const { camelCase } = require( "camel-case" );
import { camelCase } from "camel-case";

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

		if( n > this.level + 1 ){
			throw new Error( `unexpected extra indent the indent is${n},but expacted not exceeding ${this.level}` );
			// this.array[ this.level = n ] = 1;
			// return this;
		}
			
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

import chalk from "chalk";
function mark( position ){
	return (" ".repeat( position - 2 ) + chalk.red("---^---") + "\n\there the environment led by this symbol is not enclosed, or it has an embedded environment not enclosed");
}

export default function parse( source ){
	const state = {
		images: "",
		doc   : [],
	};
	const structure = []
	const subtitle = new counter;
	let i = 0;
	source.split( /\r\n|\n\r|\n|\r/g ).forEach( function( line, index ){
		if( !line )
			return;
		let result;
		try {
			result = parseLine( line );
		} catch( error ){
			if( error instanceof formatError )
				if( error instanceof timeFormatError )
					throw new Error( 
`unexpected ${ chalk.yellow("time format error") }:
	at line ${ 1+index }, expect format ${ error.format }, received ${ error.received }
	note: the origin line was
${ 1+index }| ${ line }
` );
				else
					throw new Error( 
`unexpected ${ chalk.yellow("unmatched environment") }:
	at line ${ chalk.green(1+index) }, \`${ error.uib.at(-1) ?? "$" }\` not enclosed
	note: working on the text
${ chalk.green(1+index) }| ${ error.text }
${ mark( (1+index).toString().length + error.index ) }
` );
			else throw error;
		}

		switch( result.type ){
		case "image":
			state.images += `import _${ result.name } from "${ result.path }";\nconst ${ result.name } = imagePath( _${result.name} );\n`;
			state.doc.push( `<div class="\${names.image}">
				<img src="${
					result.name.endsWith("Svg") ?
						`data:image/svg+xmk,` : ""
				}\${${ result.name }}" />
				<span>${ result.caption }</span>
			</div>` );
			break;
		case "title":
			state.doc.push( `<div class="\${names.title}"  data-id="${i}">
				<h2>${ result.content }</h2>
				<span>${ result.time }</span>
			</div>` );
			structure.push({
				'id':i,
				'title':result.content,
				'subtitle':[]
			})
			break;
		case "subtitle":
			subtitle.count( result.indent );
			state.doc.push( `<div class="\${names.subtitle}">${
				`<span class="\${names.subtitle} \${names.indent}"></span>`.repeat( result.indent )
			}<span class="\${names.subtitle} \${names.enumerate}">${ subtitle }</span>
			${ result.content }</div>` );
			if(result.indent == 0){
				structure[structure.length-1]['subtitle'].push(result.content)
			}
			
			break;
		default:
			state.doc.push( `<div class="\${names.plain}">
				${ `<span class="\${names.plain} \${names.indent}"></span>`.repeat( result.indent ) }
				<div>${ result.content }</div>
			</div>` );
		}
	} );

	return `
	import template from "components/markdown";
	const element = new template;
	import { imagePath } from "utils/fetch";
	
	import names from "components/markdown/index.lmss";
	${ state.images }
	element.$refs.self.innerHTML = \`
	${ state.doc.join( "" ) }
	\`
	const stru = ${JSON.stringify(structure)}
	
	export default element
	export {element, stru};
	`;
};