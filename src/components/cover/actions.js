import anime from "animejs";
import style from './index.lmss';
import entries from "root/.entries.json";
import suspend from './suspend.eft'
export default {

	basic( { state } ){
		console.log(entries);
		let string = ''
		entries.pages.forEach(element => {
			if(element.topic == 'basic'){
				string = string + `<li><a href = '${new URL(element.location,extern_baseURL)}'>${element.location}</a></li>`
			}
			const sus = new suspend({
				$data:{
					text:'basic'
				}
			})
			sus.$refs.ul.innerHTML = string;
			state.suspend = sus;
		});
		let wwidth = 0.5*window.innerWidth;
		anime({
			targets:state.suspend.$data,
			keyframes:[
				{width:'0px',borderRight:'#333'},
				{width:'0px',borderRight:'#fff',duration: 100},
				{width:wwidth+'px',borderRight:'#fff',duration: 500},
				{width:wwidth +'px',borderRight:'#333',duration: 100}
			],
			easing:'easeInOutCubic'
		})
	},
	advanced( { state } ){
		console.log(entries);
		let string = ''
		entries.pages.forEach(element => {
			if(element.topic == 'advanced'){
				string = string + `<li><a href = '${new URL(element.location,extern_baseURL)}'>${element.location}</a></li>`
			}
			const sus = new suspend({
				$data:{
					text:'advanced'
				}
			})
			sus.$refs.ul.innerHTML = string;
			state.suspend = sus;
		});
		let wwidth = 0.5*window.innerWidth;
		anime({
			targets:state.suspend.$data,
			keyframes:[
				{width:'0px',borderRight:'#333'},
				{width:'0px',borderRight:'#fff',duration: 100},
				{width:wwidth+'px',borderRight:'#fff',duration: 500},
				{width:wwidth +'px',borderRight:'#333',duration: 100}
			],
			easing:'easeInOutCubic'
		})
	},
	styles( { state } ){
		console.log(entries);
		let string = ''
		entries.pages.forEach(element => {
			if(element.topic == 'styles'){
				string = string + `<li><a href = '${new URL(element.location,extern_baseURL)}'>${element.location}</a></li>`
			}
			const sus = new suspend({
				$data:{
					text:'styles'
				}
			})
			sus.$refs.ul.innerHTML = string;
			state.suspend = sus;
		});
		let wwidth = 0.5*window.innerWidth;
		anime({
			targets:state.suspend.$data,
			keyframes:[
				{width:'0px',borderRight:'#333'},
				{width:'0px',borderRight:'#fff',duration: 100},
				{width:wwidth+'px',borderRight:'#fff',duration: 500},
				{width:wwidth +'px',borderRight:'#333',duration: 100}
			],
			easing:'easeInOutCubic'
		})
	},
	timeArrangement( { state } ){
		console.log(entries);
		let string = ''
		entries.pages.forEach(element => {
			if(element.topic == 'timeArrangement'){
				string = string + `<li><a href = '${new URL(element.location,extern_baseURL)}'>${element.location}</a></li>`
			}
			const sus = new suspend({
				$data:{
					text:'timeArrangement'
				}
			})
			sus.$refs.ul.innerHTML = string;
			state.suspend = sus;
		});
		let wwidth = 0.5*window.innerWidth;
		anime({
			targets:state.suspend.$data,
			keyframes:[
				{width:'0px',borderRight:'#333'},
				{width:'0px',borderRight:'#fff',duration: 100},
				{width:wwidth+'px',borderRight:'#fff',duration: 500},
				{width:wwidth +'px',borderRight:'#333',duration: 100}
			],
			easing:'easeInOutCubic'
		})
	},
};

