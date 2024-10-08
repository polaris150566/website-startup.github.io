import cover_and_frontpage from './index.efml';
import { PageFlip } from 'page-flip';
import pages from './pages.eft';
import cards_list from './cards_list.eft';
import cards from './cards.eft';
import style from './index.lmss';
import subtherapyT from './therapy.eft';
import anime from 'animejs';
import throttle from 'utils/throttle.js';
import bubbles4 from './s4.svg'
import bubbles5 from './s5.svg'
//import { Linter } from 'eslint';

const __s3__ = new (class S3_control{
	constructor(){
		;
	}
	s3_initialize(){
		console.log('s3')
		const interval = 500;
		setTimeout(() => {
			anime( {
				targets : `.${ style.vp1 }`,
				keyframes:[
					{opacity : 0 , translateY:100},
					{opacity : 1 , translateY:0  }
				],
				easing :'easeOutQuad',
				duration: interval,
			} ).finished.then( () =>
				anime( {
					targets : `.${ style.vp2 }`,
					keyframes:[
						{opacity : 0 , translateY:100},
						{opacity : 1 , translateY:0  }
					],
					easing :'easeOutQuad',
					duration: interval,
				} ).finished
			).then( () => {
				anime( {
					targets : `.${ style.vp3 }`,
					keyframes:[
						{opacity : 0 , translateY:100},
						{opacity : 1 , translateY:0  }
					],
					easing :'easeOutQuad',
					duration: interval,
				});
			} );
		}, 1000);
	};
	s3_disappear(){
		anime({
			targets:`.${ style.vp3 } ,.${ style.vp2 } ,.${ style.vp1 }`,
			opacity:0,
			duration:500,
			easing:'linear',
		})
	}
})

class cover_and_frontpage_control extends cover_and_frontpage{//加设鼠标，滚轮，点击翻页效果
	constructor(){
		super( {
			$data: {
			task: ( state ) =>{
				document.addEventListener( 'wheel', throttle( ( event ) => {
					event.preventDefault();
					if( event.deltaY<0 ){
						state.switchUp();
					} else if( event.deltaY>0 ){
						state.switchDown();
					}
				}, 500 ), { passive: false } );
				document.addEventListener( 'keydown', ( event ) => {
					if ( event.key === 'ArrowUp' || event.keyCode === 38 ){
						event.preventDefault();
						state.switchUp();
					} else if( event.key === 'ArrowDown' ||event.keyCode === 40 ){
						event.preventDefault();
						state.switchDown();
					}
				} );
			}
			}
		} );
		this.current_number = 1;
	};
	current_number_init(){
		this.current_number = 1;
		document.querySelector( `${ style.s1 }` ).scrollTo( { top: 0, behavior: 'smooth' } );
	}
	switchUp(){
		if( document.querySelector( `#s${ this.current_number-1 }` ) ){
			console.log( 'success' );
			this.current_number -= 1;
			document.querySelector( `#s${ this.current_number }` ).scrollIntoView();
			if( this.current_number == 2 ){//离开第三页，文字消失
				__s3__.s3_disappear();
			}
		}else{
			console.log( this.current_number, document.querySelector( `#s${ this.current_number }` ) );
		}
	};
	switchDown(){
		if( document.querySelector( `#s${ this.current_number+1 }` ) ){
			console.log( 'success' );
			this.current_number += 1;
			document.querySelector( `#s${ this.current_number }` ).scrollIntoView();
			if( this.current_number == 3 ){//第三页，触发文字出现
				__s3__.s3_initialize();
			}
		}else{
			console.log( this.current_number, `#s${ this.current_number }`, document.querySelector( `#s${ this.current_number }` ) );
		}
	}
}
const Cover_and_frontpage  = new cover_and_frontpage_control();//实例化
Cover_and_frontpage.pages1 = new pages();//挂载pages

//——————————————————————————挂载卡片
const Cards_list = new cards_list();
for( let i = 0;i<10;i++ ){
	Cards_list.cardslist.push( new cards( {
		$data: {
			text : `这是第${ i }个元素`,
			name : `NO.${ i }`,
			count: i,
			value: i
		}
	} ) );
}
//——————————————————————————设置s2卡片样式
Cover_and_frontpage.cards = Cards_list;
for( let j = 0;j<Cover_and_frontpage.cards.cardslist.length;j++ ){ //设置卡片初始值
	//console.log(state.$refs.self.children[j]);
	const arr = Cards_list.cardslist;
	const k   = arr[j];
	//console.log(k.$data.value)
	//console.log(arr[j].$refs.cards)
	k.$refs.cards.style.transform       = `rotate(${ ( j-1 )*5+30 }deg)`;
	k.$refs.cards.style.transformOrigin = `bottom left`;
}
//——————————————将therapy挂上去
for( let i = 0;i<5;i++ ){
	Cover_and_frontpage.therapy.push( new subtherapyT( {
		$data: {
			text: i,
		}
	} ) );
}
//——————————————————————渲染S4
Cover_and_frontpage.$refs.s4svg.innerHTML = bubbles4;

//——————————————————————渲染S5
Cover_and_frontpage.$refs.s5svg.innerHTML = bubbles5;

//——————————————————————导出，最后在根目录下的index总装
export default Cover_and_frontpage;
