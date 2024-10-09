import anime from "animejs";
import style from './basicgrammar.lmss';
import basicgrammar from ".";
export default {
	scrollintoview( { state } ){
		const tmp = basicgrammar.matchingnode( state.$refs.self, 0 );
		if( tmp ){
			tmp.scrollIntoView();
		}
	}
};