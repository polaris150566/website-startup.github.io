import footerT from './footer.eft'
import ustclogo from './logo.png'
import igemlogo from './igem-logo-light.svg'
class footer_control extends footerT{
    constructor(){
        super();
        this.$refs.svg2.innerHTML = igemlogo;
    }
    mount(){
        this.$mount( {
			target: document.body,
			option: "append",
		} );
    }
}
const footer  = new footer_control();
footer.mount();