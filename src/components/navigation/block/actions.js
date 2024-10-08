import anime from "animejs";
export default {
	drag( { state } ){ //用于拖拽小标题
		//console.log(state);
		state.$refs.self.classList.add( "cursorBlind" );
		console.log( state );
		anime( {
			targets  : state.$refs.sub,
			keyframes: [
				{ scaleX: 1, scaleY: 0.0, duration: 0 ,opacity:1},
				{ scaleX: 1, scaleY: 1, translateY: 0 ,opacity:1},
			],
			duration: 500,
			easing  : 'linear',
			loop    : false
		} );
		document.addEventListener( 'mousedown', function listoff( event ){
			console.log( event );
			if ( !state.$refs.sub.contains( event.target ) ){
				state.$refs.self.classList.remove( "cursorBlind" );
				//console.log('Clicked outside of the element!');
				anime( {
					targets : state.$refs.sub,
					opacity : 0,
					scaleX  : 1,
					scaleY  : 0,
					duration: 500,
					easing  : 'easeOutQuint',
					loop    : false
				} );
				document.removeEventListener( 'mousedown', listoff );
			}
		} );

	},
	// antidrag( { state } ){ //用于拖拽小标题
	// 	//console.log(state);
	// 	//state.$refs.self.classList.remove( "cursorBlind" );
	// 	console.log( state );
	// 	if ( !state.$refs.sub.contains( state ) ){

	// 		//console.log('Clicked outside of the element!');
	// 		anime( {
	// 			targets   : 'a>div>a',
	// 			scaleX    : 1,
	// 			translateY: -100,
	// 			duration  : 1000,
	// 			easing    : 'easeOutElastic(1, .8)',
	// 			loop      : false
	// 		} );
	// 	}
	// },

	draglogo( { state } ){ //用于logo的拖拽
		console.log( state );
		state.$refs.self.classList.add( "cursorBlind" );
		// anime( {
		// 	targets   : state.$refs.self,
		// 	translateY: `calc( 50px * ${ state.list.length } )`,
		// 	duration  : 500,
		// 	easing    : "easeInOutExpo"
		// } );
	}
};
