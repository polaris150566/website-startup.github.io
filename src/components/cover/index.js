import cover_and_frontpage from './index.efml';

class cover_and_frontpage_control extends cover_and_frontpage{//加设鼠标，滚轮，点击翻页效果
	constructor(){
		super( );
		this.current_number = 1;
	};
}
const Cover_and_frontpage  = new cover_and_frontpage_control();//实例化

export default Cover_and_frontpage
