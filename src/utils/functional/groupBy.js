export const groupBy = Symbol( "groupBy" );
export default groupBy;

Array.prototype[ groupBy ] = function( func ){ //挂载在数组上

	const result = {};

	for( let elem of this )//遍历array这个数组中的对象，如果result里面的func（elem）这个键不为空，则将elem加入对象
		( result[ func( elem ) ] ??= [] ).push( elem );

	return result;

};

export const toEntry = Symbol( "toEntry" );

Object.prototype[ toEntry ] = function(){
	return Object.entries( this );//Object.entries():将对象强转成一个二维数组。每个数组是键值对构成的数组。
};