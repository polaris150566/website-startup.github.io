import cover_and_frontpage from './index.efml';
import style from './index.lmss'
import cardT from './cards.eft'
import s301 from './s301.svg'
import s302 from './s302.svg'
import s303 from './s303.svg'
import s101 from './s101.svg'
import s102 from './s102.svg'
import s103 from './s103.svg'
import s104 from './s104.svg'
let s3svgs = [s301,s302,s303];
let s1svgs = [s101,s102,s103,s104];

const s3array = [
	{text:'A basic understanding of website principles'},
	{text:'A better command of insight into programming concept'},
	{text:'A more fluid collaboration with others'}
]


function scrolltoaction(scrolly) {
	if(scrolly<400){
		console.log(`${style.frontpagemasking}`)
		let tar = document.querySelector(`.${style.frontpagemasking}`);
		tar.style.opacity = 1-(scrolly/400);
		tar.style.transform = `scaleX(${1+scrolly/1000})`;
		tar.style.filter = `blur(${scrolly/200}px)`
	}
}


class cover_and_frontpage_control extends cover_and_frontpage{//加设鼠标，滚轮，点击翻页效果
	constructor(){
		super( );
		
		for(let i = 0;i<3;i++){
			this.cardslist.push(new cardT({
				$data:{
					text:s3array[i].text,
				}
			}))
		}

	}
	mount(){
		this.$mount( {
			target: document.body,
			option: "append",
		} );
		document.addEventListener('scroll',()=>{
			console.log(window.scrollY);
			scrolltoaction(window.scrollY);
		})
		document.querySelectorAll(`.${style.circle}`).forEach((element,index)=>{
			element.innerHTML = s3svgs[index];
		})
		document.querySelectorAll(`.${style.s1svg}`).forEach((element,index) => {
			element.innerHTML = s1svgs[index];
		});
	}
}
const Cover_and_frontpage  = new cover_and_frontpage_control();//实例化

export default Cover_and_frontpage
