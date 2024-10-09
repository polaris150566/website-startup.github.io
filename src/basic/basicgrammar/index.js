

import style from './basicgrammar.lmss';
import parse from "./basicgrammar_parse.js";
import div from './emptydiv.eft';
import subtopicT from './topicTemplate/subtopic.eft';
import topicT from './topicTemplate/topic.eft';
import names from "components/markdown/index.lmss";


const mdlist = parse.map( ( element ) => {
	let tmp     = new div;
	tmp.content = element.text;
	return tmp;
} );
const stru = [];
parse.forEach( ( element ) => {
	element.stru.forEach( ( ele ) => {
		stru.push( ele );
	} );
} );

function stripTags( str ){
	return str.replace( /^<[\s\S]*?>|<[\s\S]*?>$/g, '' );
}



import basicgrammarT from './basicgrammar.eft';


class basicgrammar_control extends basicgrammarT{
	constructor(){
		super();

		this.basicgrammar_content = mdlist;

		this.structure = JSON.parse( JSON.stringify( stru ) );//自动生成title
		this.structure.forEach( ( element ) => {
			const topi = new topicT( {
				$data: {
					topic: stripTags( element['title'] ),
				}
			} );
			element['subtitle'].forEach( ( item ) => {
				topi.subtopics.push( new subtopicT( {
					$data: {
						text: item
					}
				} ) );
			} );
			this.basicgrammar_menu.push( topi );
		} );

	}
	matchingnode( nodepoint, mode = 0 ){ //根据titlezhaocontent是0,根据content找title是1
		let tmp = null;

		if( mode == 0 ){
			this.nodearray.forEach( ( element ) => {
				if( element.title == nodepoint ){
					tmp =  element.content;
				}
			} );
		} else if( mode == 1 ){
			this.nodearray.forEach( ( element ) => {
				if( element.content == nodepoint ){
					tmp =  element.title;
				}
			} );
		}
		return tmp;
	}
	mount(){
		this.$mount( {
			target: document.body,
			option: 'append'
		} );
        console.log('success')
		const title    = this.basicgrammar_menu.map( ( element ) => element.$refs.self );
		const content  = document.querySelectorAll( `.${ names.title }` );
		this.nodearray = [];
		for( let j = 0;j<content.length;j++ ){
			this.nodearray.push( {
				'title'  : title[j] || null,
				'content': content[j] || null
			} );
		}
	}
}
const basicgrammar = new basicgrammar_control();
basicgrammar.mount();

document.addEventListener( 'scroll', ( event ) => {
	let observer = new IntersectionObserver( function( entries ){
		entries.forEach( ( element ) => {
			if( element.isIntersecting ){
				let tmp = basicgrammar.matchingnode( element.target, 1 );
				if( tmp )
					tmp.children[0].style.transform = 'scale(1.1)';
			} else{
				let tmp = basicgrammar.matchingnode( element.target, 1 );
				if( tmp )
					tmp.children[0].style.transform = 'scale(1)';
			}
		} );
	}, null, 0, 0.5 );
	basicgrammar.nodearray.forEach( ( element ) => {
		observer.observe( element.content );
	} );
} );

export default basicgrammar;
