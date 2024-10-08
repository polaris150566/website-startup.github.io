import { PageFlip } from "page-flip";
import cover_and_frontpage from './index.efml';
import style from './index.lmss';
import pages from './pages.eft';
import throttle from "../../utils/throttle";
function reload_pages( target_obj, newwidth ){
	target_obj.pages1 = new pages();
	load_pages( newwidth );
	//load_pages_auto(target_obj,newwidth);
}
function load_pages( Width ){
	function load( width, tres1, tres2, max_width, max_height, middle_width, middle_height, min_width, min_height ){
		let pageFlip = null;
		if( width>tres1 ){
			pageFlip = new PageFlip( document.getElementById( 'book' ), {
				width              : max_width,
				height             : max_height, // base page height
				size               : 'stretch',
				minWidth           : 315,
				maxWidth           : 1000,
				minHeight          : 420,
				maxHeight          : 1350,
				maxShadowOpacity   : 0.5, // Half shadow intensity
				showCover          : true,
				mobileScrollSupport: false // disable content scrolling on mobile devices
			} );
			pageFlip.loadFromHTML( document.querySelectorAll( `.${ style.page },.pcover` ) );
		} else if( tres2<width<tres1 ){
			pageFlip = new PageFlip( document.getElementById( 'book' ), {
				width              : middle_width,
				height             : middle_height, // base page height
				size               : 'stretch',
				minWidth           : 315,
				maxWidth           : 1000,
				minHeight          : 420,
				maxHeight          : 1350,
				maxShadowOpacity   : 0.5, // Half shadow intensity
				showCover          : true,
				mobileScrollSupport: false // disable content scrolling on mobile devices
			} );
			pageFlip.loadFromHTML( document.querySelectorAll( `.${ style.page },.pcover` ) );
		} else{
			pageFlip = new PageFlip( document.getElementById( 'book' ), {
				width              : min_width,
				height             : min_height, // base page height
				size               : 'fixed',
				minWidth           : 315,
				maxWidth           : 1000,
				minHeight          : 420,
				maxHeight          : 1350,
				maxShadowOpacity   : 0.5, // Half shadow intensity
				showCover          : true,
				mobileScrollSupport: false // disable content scrolling on mobile devices
			} );
			pageFlip.loadFromHTML( document.querySelectorAll( `.${ style.page },.pcover` ) );
		}
		return pageFlip;
	}
	const pageFlip = load( Width, 1200, 800, 600, 700, 400, 600, 800, 550 );
	pageFlip.on( "flip", ( event ) => {
		console.log( event );
	} );
}
export default function load_pages_auto( target_obj, Width ){ //现在把covert传进来，里面包含#book元素，
	load_pages( Width );
	let f = throttle( function(){ //一旦改变视口，直接把原来的挂在删掉，换一个新的，并重新加载样式
		reload_pages( target_obj, window.innerWidth );
	}, 100 );
	window.addEventListener( 'resize', f );
}