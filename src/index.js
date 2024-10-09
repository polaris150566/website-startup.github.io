import load_pages_auto from './components/cover/pages.js';//把书本导入进来
import { PageFlip } from 'page-flip';//书本的包
import coverT from "components/cover/index.js";//导入cover里面的indexjs
import throttle from 'utils/throttle.js';
//import pages from 'components/cover/pages.js'
//const cover = new coverT;
coverT.$mount( {
	target: document.body,
	option: "append",
} );

// load_pages_auto( coverT, window.innerWidth );


// document.addEventListener( 'keydown', ( event ) => {
// 	if ( event.key === 'ArrowUp' || event.keyCode === 38 ){
// 		event.preventDefault();
// 		coverT.switchUp();
// 	} else if( event.key === 'ArrowDown' ||event.keyCode === 40 ){
// 		event.preventDefault();
// 		coverT.switchDown();
// 	}
// } );
// document.addEventListener('wheel',throttle((event)=>{
// 	event.preventDefault();
// 	if(event.deltaY<0){
// 		coverT.switchUp();
// 	}
// 	else if(event.deltaY>0){
// 		coverT.switchDown();
// 	}
// },500),{ passive: false })
document.addEventListener( 'click', ( event ) => {
	coverT.switchDown();
} );
// document.getElementById('cards_container').addEventListener('mouseenter',function(){

// })
import * as d3 from "d3";
import Svg_process from"src/components/cover/MorphingSVG.js"
const svg_process = new Svg_process
svg_process.morphPathsSequential(d3.select("#path1"))