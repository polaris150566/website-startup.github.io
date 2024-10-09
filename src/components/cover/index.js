import cover_and_frontpage from './index.efml';
import cardT from './cards.eft'
const s3array = [{text:'text1'},{text:'text2'},{text:'text3'}]

class cover_and_frontpage_control extends cover_and_frontpage{//加设鼠标，滚轮，点击翻页效果
	constructor(){
		super( );
		this.current_number = 1;
		for(let i = 0;i<3;i++){
			this.cardslist.push(new cardT({
				$data:{
					text:s3array[i].text,
				}
			}))
		}
	};
}
const Cover_and_frontpage  = new cover_and_frontpage_control();//实例化

export default Cover_and_frontpage
