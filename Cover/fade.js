import anime from "animejs";
export default function( { state } ){
	anime( {
		targets   : state.$refs.center,
		translateY: "-100%",
		easing    : "easeInOutCubic",
		duration  : 3000
	} );
	state.$data.opacity = 1;
	anime( {
		targets : state.$data,
		opacity1: 0,
		opacity2: 0,
		duration: 3000,
		easing  : "easeInOutCubic"
	} ).finished.then( () => state.$data.display = 'none' );
}