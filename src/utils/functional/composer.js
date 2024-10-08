import id from "./id";

// 组合一列函数，从从左向右依次作用
// compose( f, g )( x ) ::= f g x
export default function compose( ...funcs ){

	if( funcs.length === 0 )
		return id;

	if( funcs.length === 1 )
		return funcs[0];

	return funcs.reduceRight( ( a, b ) => ( ...args ) => a( b( ...args ) ) );

}

// 组合一列函数成为管道，从右向左依次作用
// pipe( f, g )( x ) ::= g f x
export function pipe( ...funcs ){

	if( funcs.length === 0 )
		return id;

	if( funcs.length === 1 )
		return funcs[0];

	return funcs.reduce( ( a, b ) => ( ...args ) => a( b( ...args ) ) );

}

// 符号化
export const Compose = Symbol( "compose" );
export const Pipe = Symbol( "pipe" );

Object.prototype[Pipe] = function( func = id ){
	return func( this );
};

Array.prototype[Compose] = function(){
	return compose( ...this );
};
