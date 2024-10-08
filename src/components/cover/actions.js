import anime from "animejs";
import style from './index.lmss';

let cards_rotate         = 5;//卡牌旋转度数
let cards_rotate_timeout = 150;//卡牌迭代间隔时间
export default {

	slideUp( { state } ){ //封面上翻
		let slideuptime = 1500;
		anime({
			targets:'#title',
			opacity:0,
			duration:500,
		}).finished.then(()=>{
			document.querySelector(`#title`).style.display = 'none'
		}).then(()=>{
					anime( {
						targets        : "#cover",
						scaleY         : '0',
						transformOrigin: '0px 0px',
						//translateY: "-100%",
						easing         : "easeInOutExpo",
						duration       : slideuptime,
					} )
				}
			).then( state.$data.task( state ) )
		anime( {
			targets  : "#cards_container",
			keyframes: [
				{ scaleY: '1', },
				{ scaleY: '0.9', },
				{ scaleY: '1', }
			  ],
			transformOrigin: 'center',
			easing         : 'linear',
			duration       : slideuptime,
		} ).finished.then(
			function(){
				for( let j = 0;j<document.getElementById( `cards_container` ).children.length;j++ ){
					const arr         = document.getElementById( `cards_container` ).children;
					const k           = arr[j];
					k.style.transform = `rotate(${ ( j-( arr.length-0.5 )*0.5 )*5 }deg) translate(${ 110*( j-( arr.length-0.5 )*0.5 ) }px)`;
				}
			}
		);
		for( let j = 0;j<document.getElementById( `cards_container` ).children.length;j++ ){
			//console.log(state.$refs.self.children[j]);
			const arr         = document.getElementById( `cards_container` ).children;
			const k           = arr[j];
			k.style.transform = `rotate(0deg) translate(0px)`;
		}
	},
	show( { state } ){ //卡片展开
		//console.log(state.$refs.self.children);
		for( let j = 0;j<state.$refs.self.children.length;j++ ){
			//console.log(state.$refs.self.children[j]);
			const k           = state.$refs.self.children[j];
			k.style.transform = `rotate(${ ( j-( state.$refs.self.children.length-1 )*0.5 )*5 }deg) translate(${ 90*( j-( state.$refs.self.children.length-1 )*0.5 ) }px)`;
		}

	},
	antishow( { state } ){ //卡片收回
		//console.log(state.$refs.self.children);
		for( let j = 0;j<state.$refs.self.children.length;j++ ){
			//console.log(state.$refs.self.children[j]);
			const k           = state.$refs.self.children[j];
			k.style.transform = `rotate(0deg) translate(0px)`;
		}

	},
	cards_emphasize( { state } ){ //卡片突出显示
		//console.log(state.$refs.cards.parentNode.children);
		for( let j = 0;j<state.$refs.cards.parentNode.children.length;j++ ){
			//console.log(state.$refs.self.children[j]);
			const k = state.$refs.cards.parentNode.children[j];
			//console.log(k == state.$refs.cards)
			if( k == state.$refs.cards ){
				k.style.zIndex     = 50;
				k.style.transform += ' translateY(-50px)';
			} else{
				k.style.backgroundColor = 'grey';
				//console.log(k)
			}

		}
	},
	anti_cards_emphasize( { state } ){ //卡片复色
		//console.log(state.$refs.cards.parentNode.children);
		for( let j = 0;j<state.$refs.cards.parentNode.children.length;j++ ){
			//console.log(state.$refs.self.children[j]);
			const k = state.$refs.cards.parentNode.children[j];
			//console.log(k == state.$refs.cards)
			if( k == state.$refs.cards ){
				k.style.zIndex     = 'auto';
				k.style.transform +=' translateY(50px)';
			} else{
				k.style.backgroundColor = 'aqua';
				//console.log(k)
			}

		}
	},
	rotate_plus( { state } ){
		//console.log(state.$refs.front,state.$refs.back);
		state.$refs.front.classList.toggle( `${ style.front_active }` );
		state.$refs.back.classList.toggle( `${ style.back_active }` );
		const k = state.$refs.cards.parentNode.children;
		for( let j = 0;j<k.length;j++ ){
			if( k[j] == state.$refs.cards ){
				for( let m = 1;m<k.length+1;m++ ){
					if( k[j-m] ){
						setTimeout( () => {
							k[j-m].children[0].classList.toggle( `${ style.front_active }` );
							k[j-m].children[1].classList.toggle( `${ style.back_active }` );
						}, m*cards_rotate_timeout );

					}
					if( k[j+m] ){
						setTimeout( () => {
							k[j+m].children[0].classList.toggle( `${ style.front_active }` );
							k[j+m].children[1].classList.toggle( `${ style.back_active }` );
						}, m*cards_rotate_timeout );
					}
				}
			}
			// k.style.transform +=`
			// 	rotateZ(${-(j-(state.$refs.cards.parentNode.children.length-1)*0.5)*5}deg)
			// 	translateY(50px)
			// 	translateX(${90*(j-(state.$refs.cards.parentNode.children.length-1)*0.5)}px)`
		}
	},
	suspend_open( { state } ){ //让悬浮窗口出现
		(function(){
			return new Promise((resolve,reject)=>{
				document.getElementById( 'suspend' ).style.display = 'block';
				resolve('success')
			})
			
		})().then((result)=>{
			anime( {
				targets  : `.${ style.suspend }`,
				opacity:1,
				translateY:-50,
				easing  : 'easeInOutQuad',
				duration: 400,
			} );
		}).catch(error=>{
			console.log(error);
		})
		
		
	},
	suspend_close( { state } ){ //让悬浮窗口关闭
		const closingtime = 500;
		anime( {
			targets    : `.${ style.suspend }`,
			opacity    : 0,
			translateY : 100,
			easing     : 'easeInOutQuad',
			duration   : closingtime,
		} ).finished.then( () => {
			setTimeout(()=>{
				document.getElementById( 'suspend' ).style.display = 'none';
			},300)
		} );
	}
};

