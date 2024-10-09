//这个文件挂载的是navigation
import template from "./template.js";

const component = new template({
	$data:{
		url:extern_baseURL,
	}
});
//component.$refs.navsensor.innerHTML = `<img src='./src02.png' alt=""><img src="src03.png" alt=""><img src="src04.png" alt="">`
component.$mount( {
	target: document.querySelector( "header" ),
	option: "replace"
} );
export default component;
