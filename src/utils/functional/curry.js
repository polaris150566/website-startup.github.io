// 柯里化函数

/**
 * Curries a given function.
 * @template T
 * @param {(...args: T[]) => any} func - The function to curry.
 * @returns {function(...newArgs: T[]): Function}
 */

// export default function curry( func = () => {} ){
// 	let args  = [];
// 	let proxy = new Proxy( function(){}, {
// 		apply: function( target, thisArg, arg ){
// 			if( arg.length === 0 )
// 				return func( ...args );
// 			args.push( ...arg );
// 			return proxy;
// 		}
// 	} );
// 	return proxy;
// }

export default function curry( func = () => {} ){
	let args = [];
	return function curried( ...newArgs ){
		if( newArgs.length === 0 )
			return func( ...args );
		args.push( ...newArgs );
		return curried;
	};
}

// usage:
// g is a function
// const f = curry( /* a function */ g )
// f( 1 )( 2 )( 3 )() // g( 1, 2, 3 )
// f() // g()

// 符号化
export const Curry = Symbol( "curry" );
Function.prototype[Curry] = function(){
	return curry( this );
};
