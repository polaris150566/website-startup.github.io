// 定义恒等映射

export default function id( input ){
	return input;
}

// 定义对偶平凡泛函
// Conjugate x ::= () => x
export const Conjugate = Symbol( "Conjugate" );
Object.prototype[Conjugate] = function(){
	return this;
};

export function conjugate( x ){
	return function(){
		return x;
	};
}
