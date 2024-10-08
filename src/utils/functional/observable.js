// 实现observable
// observable以订阅参数量的形式向函数分配参数
// 每次调用后，observable会以signal的形式返回目前的状态
import isNumber from "is-number";

export const signals = {
	upToDate  : Symbol( "upToDate" ),
	error     : Symbol( "error" ),
	fulfilled : Symbol( "fulfilled" ),
	awaiting  : Symbol( "awaiting" ),
	informed  : Symbol( "informed" ),
	obstackled: Symbol( "obstackled" )
};


export default class Observable{

	bus = []; // 事件总线
	subscribers = []; // 所有的订阅
	informed = false; // 一旦inform，则停止分配，直到exec
	obstackles = 0; // 用障碍阻止继续调用

	constructor( ...events ){
		this.bus = events;
		this.update;
	}

	get update(){

		if( this.obstackles )
			return signals.obstackled;
		if( this.informed )
			return signals.informed;
		if( !( this.subscribers.length || this.bus.length ) )
			return signals.upToDate;

		const { routine, argc } = this.subscribers[0];

		if( this.bus.length < argc )
			return signals.awaiting;

		routine( ...this.bus.slice( 0, argc ) );
		return signals.fulfilled;
	}

	subscribe( routine, argc = 0 ){
		if( !isNumber( argc ) )
			throw new Error( "subscriber's argc must be a number" );
		this.subscribers.push( { routine, argc } );
		this.update;
	}

	emit( ...events ){
		this.bus.push( ...events );
		this.update;
	}

	get inform(){ return this.informed = true; }
	get exec(){ return this.informed = false; }

	get obstackle(){ return ++this.obstackles; }
	get clearPath(){ if( this.obstackle ) --this.obstackles; return this.obstackles; }

}

export { Observable };
