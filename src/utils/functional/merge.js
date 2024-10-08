// 合并两个对象：尽可能采用第二个对象的键值。如果第二个对象的某键值为null或undefined，采用第一个对象的对应键。

export default function merge( obj1, obj2 ){
	let merged = { ...obj1 };

	Object.keys( obj2 ).forEach( key => {
		let set = true;
		obj2[key] ?? ( set = false );
		set
			? ( merged[key] = obj2[key] )
			: undefined;
	} );

	return merged;
}


// 符号化
export const Merge = Symbol( "merge" );
Object.prototype[Merge] = function( that ){
	Object.keys( that ).forEach( key => {
		let set = true;
		that[key] ?? ( set = false );
		set
			? ( this[key] = that[key] )
			: undefined;
	} );
	return this;
};
