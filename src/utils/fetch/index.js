export function resource( url, options ){
	return fetch(
		new URL( url, extern_baseURL ),
		options
	);
}

import id from "functional/id";
export function image( url, options, errHandler = id ){
	return fetch(
		new URL( url, new URL( "images/", extern_baseURL ) ),
		options
	).then( _ => _.ok ? _.blob() : errHandler( _ ) );
}

//import path from "./A.png"; 
// https://2024.igem.wiki/ustc/images/A.png

// const realpath = imagePath( path );
// https://tools.igem.org/teams/5302/A.png
export function imagePath( url ){
	return url.replace( /2024.igem.wiki\/ustc\//g, "tools.igem.wiki/teams/5302/"  )
}