import block from "./index.eft";
import link from "./link";

export default class extends block{

	constructor( efArgs, pages ){
		super( efArgs );
		this.list = pages.map( ( { location }, index ) => new link( {
			$data: {
				text: location,
				href: new URL( location, extern_baseURL ),
				n   : 1+index
			}
		} ) );
	}

}
