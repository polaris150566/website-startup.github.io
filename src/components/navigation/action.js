import anime from "animejs";
class navigation_toggleT{
	constructor(){
		this.blur = true;
	}
	navigation_toggle(){
		console.log( this.blur );
		if( this.blur == false ){
			this.blur = true;
			anime( {
				targets   : '#navigation_self',
				scaleX    : 0,
				translateX: 10,
				duration  : 100,
				easing    : 'linear',
			} );
		} else{
			this.blur = false;
			anime( {
				targets   : '#navigation_self',
				scaleX    : 1,
				translateX:-30,
				duration  : 100,
				easing    : 'linear',
			} );
		}
	}
}
const tmp = new navigation_toggleT();
export default {
	navigation_toggle(){
		tmp.navigation_toggle();
	}
};