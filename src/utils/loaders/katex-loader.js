const { renderToString } = require( "katex" );

module.exports = function( source ){
	return `export default ${ JSON.stringify( renderToString( source ) ) }`;
};
