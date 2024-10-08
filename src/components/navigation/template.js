import template from "./index.eft";

import { default as links, block } from "./parse";
import logotemplate from './block/logo';

export default class extends template{
	constructor( ...args ){
		super( ...args );

		links.unshift( new block( {
			$data: {
				text: ""
			} }, [] ) );
		// links.unshift( new logotemplate( { $data: { href: extern_baseURL } } ) );
		this.topics = links;
		this.logo   = new logotemplate( { $data: { href: extern_baseURL } } );
	}
}