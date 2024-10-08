import id from "./id";


// 给定对象和其上的对象路径，按此路径依次执行effect
// unpure决定副作用是否会发生在当前位置（是否通过函数返回值更改当前节点）
export default function walk( object, path, effect = id, unpure = true ){
	if( !( path instanceof Array ) )
		throw new Error( "[Erchius]Error: in function walk, expect variable `path` to be Array, indicating the walking route." );
	if( !( effect instanceof Function ) )
		throw new Error( "[Erchius]Error: in function walk, expect effect to be callable" );
	let pointer = object;
	if( unpure )
		for( let point of path )
			pointer = effect( pointer[point], object ) ?? pointer[point];
	else
		for( let point of path )
			effect( pointer = pointer[point], object );
	return pointer;
}

export const Walk = Symbol( "walk" );
Object.prototype[Walk] = function( path, effect = id ){
	return walk( this, path, effect );
};
