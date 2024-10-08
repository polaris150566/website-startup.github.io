import './logo.lmss';
import logotemplate from './logo.eft';
import src06 from "./src06.png"

export default class extends logotemplate{
	constructor( href ){
		super( href );

		this.$refs.son.innerHTML = `<img src = ${src06}>`;
	}
}
