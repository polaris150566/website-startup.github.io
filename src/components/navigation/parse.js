import entries from "root/.entries.json"; //通过entries.json的文件，自动生成一个navigation
import block from "./block"; //构造函数，两个参变量：link是网址，text是文本内容
const { pages } = entries; //page返回一个数组，里边是对象，对象里包含locations（字符串）和chunks（数组，数组里面是字符串）
import { groupBy, toEntry } from "functional/groupBy";


const links = pages.
	filter(
		( { location } ) => location !== "index"
	)[groupBy]( //对page数组进行检索，去掉index，返回一个对象
		( { topic } ) => topic
	)[toEntry]().//转化成数组
	map( ( [ topic, collection ] ) => new block( {
		$data: {
			text: topic
		}
	}, collection ) );
export default links;
export { block };
