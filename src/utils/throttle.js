export function sleep( time ){
	return new Promise(
		resolve => setTimeout( resolve, time )
	);
};

export function debounce( fn, threshhold, scope ){
	threshhold ??= 250;
	let last, timer;
	return function (){
		const context = scope ?? this;
		const now     = +new Date();
		const args    = arguments;
		if ( last && now < last + threshhold ){
			// 如果在指定的时间内，则取消之前的调用
			clearTimeout( timer );
			timer = setTimeout( function (){
				last = now;
				fn.apply( context, args );
			}, threshhold );
		} else {
			last = now;
			fn.apply( context, args );
		}
	};
};

export function throttle( fn, threshhold, scope ){
	threshhold     ??= 250;
	let inThrottle    = false;
	return function(){
		const context = scope ?? this;
		if( !inThrottle ){
			fn.apply( context, arguments );
			inThrottle = true;
			sleep( threshhold ).then( () => inThrottle = false );
		};
	};
};

export const Debounce = Symbol( "debounce" );
Function.prototype[Debounce] = function( threshhold, scope ){
	return debounce( this, threshhold, scope );
}; // Note: 'this' may differ from wrapping to trailing

export const Throttle = Symbol( "throttle" );
Function.prototype[Throttle] = function( threshhold, scope ){
	return throttle( this, threshhold, scope );
}; // Note: 'this' may differ from wrapping to trailing

export default throttle;