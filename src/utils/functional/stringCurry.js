export default function curry( func = () => {} ){
	let args = [];
	return function curried( ...values ){
		// console.log( values );
		if( values.length === 1  )
			return func( ...args );
		args.push( ...( values.slice( 1 ) ) );
		return curried;
	};
}

// export function mixedCurry( func = () => {} ){
// 	let args = [];
// 	return function curried()
// }
