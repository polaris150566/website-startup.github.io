import template from "./index.eft";

import { default as links, block } from "./parse";

export default class extends template{
	constructor( ...args ){
		super( ...args );

		links.unshift( new block( {$data: {text: ""} }, [] ) );
		links.unshift( new block( {$data: {text: ""} }, [] ) );
		links.unshift( new block( {$data: {text: ""} }, [] ) );
		links.push( new block( {$data: {text: ""} }, [] ) );
		// links.unshift( new logotemplate( { $data: { href: extern_baseURL } } ) );
		this.topics = links;
	}
}