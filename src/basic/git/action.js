import anime from "animejs";
import style from './git.lmss';
import git from ".";
export default {
	scrollintoview( { state } ){
		const tmp = git.matchingnode( state.$refs.self, 0 );
		if( tmp ){
			tmp.scrollIntoView();
		}
	}
};