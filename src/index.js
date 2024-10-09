import coverT from "components/cover/index.js";//导入cover里面的indexjs
import throttle from 'utils/throttle.js';

coverT.$mount( {
	target: document.body,
	option: "append",
} );
