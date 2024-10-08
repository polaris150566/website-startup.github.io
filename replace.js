const cssFilePath = process.argv[2];

const { readFileSync, writeFileSync } = require( "node:fs" );
const { resolve } = require( "node:path" );
const content = readFileSync( resolve( cssFilePath ), { encoding: "utf8" } );
writeFileSync( 
    resolve(cssFilePath),
    content
        .replace( /url\(images\//g, "url(https://static.igem.wiki/teams/5302/images/" )
        .replace( /url\(fonts\//g, "url(https://static.igem.wiki/teams/5302/fonts/" )
        .replace( /url\(pdfs\//g, "url(https://static.igem.wiki/teams/5302/pdfs/" )
        .split( /\r|\n|\r\n/g )
        .map( line => line.search( /url\(https:\/\/static\.igem\.wiki\/teams\/5302\//g ) + 1 ?
            line.replace( /_/g, "-" ).toLowerCase() :
            line
        ).join( "\n" )
)