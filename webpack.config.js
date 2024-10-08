
const path               = require( 'path' );//nodejs的核心模块，用来处理文件路径
/*
path常用函数：
path.join()
paht.resolve():将相对路径转化为绝对路径，

path.basename():返回文件的文件名部分path.basename('folder/file.txt');
path.dirname():返回文件的目录名部分
path.extname():返回文件的拓展名。
 */
const HtmlWebpackPlugin  = require( 'html-webpack-plugin' );//webpack插件，用来生成html文件
const webpack            = require( 'webpack' );//webpack核心库
const { entries, pages } = require( './.entries' );//从.entries.json中引入配置，entries和pages都是文件里的对象。
//require在检索文件的时候，若不加后缀名，则会按着js，json，node的顺序尝试。
const csse = require( 'mini-css-extract-plugin' );

// 配置Webpack
const rules    = require( "./webpack.rules" );//require是一个用来导入模块的函数，采用COMMONJS规范，如果输入一个相对路径，则对在当前文件相对位置查找模块，
//如果是一个核心模块名称（如fs-文件系统，http服务器，客户端请求，均为nodejs内置），nodejs会加载内置模块。如果是一个没有路径的模块名称，则会上node-modules里面找。
module.exports = function( env ){//输入env参数
	const production     = env.production;//判断是否为生产环境
	const extern_baseURL = JSON.stringify( production ? env.url_base : "http://localhost:23456/" );//如果是生产环境，则使用网址，如果不是，则使用本地地址

	const ret = {//返回一个对象，决定是生产模式或者开发模式
		mode  : production ? "production" : "development",
		entry : entries,//项目的入口文件，从entries中获取
		output: {
			filename: '[name].bundle.js',//输出文件名
			path    : path.resolve( __dirname, 'public' ),//输出地址
			clean   : true//是否清理输出目录
		},
		module: {
			rules
		},
		plugins: [
			// 为每个页面生成HTML文件
			...pages.map( ( page ) => new HtmlWebpackPlugin( {
				//使用map（）遍历数组，返回的还是一个数组，数组里面是一个实例化的对象，之后展开
				template: path.resolve( __dirname, 'src/index.html' ),
				filename: path.resolve( __dirname, `public/${ page.location }.html` ),
				chunks  : page.chunks
			} ) ),
			new webpack.DefinePlugin( {
				extern_baseURL
			} ),
			new csse({
				chunkFilename: '[id].[contenthash].css',
				filename: "[contenthash].css"
			}),
			new HtmlWebpackPlugin({
				filename: path.resolve( __dirname, `public/VEGFdistribution.html` ),
				template: path.resolve( __dirname, 'src/VEGFdistribution.html' ),
				inject:false
			}),
			new HtmlWebpackPlugin({
				filename: path.resolve( __dirname, `public/part1VEGFRlike.html` ),
				template: path.resolve( __dirname, 'src/part1VEGFRlike.html' ),
				inject:false
			}),
			new HtmlWebpackPlugin({
				filename: path.resolve( __dirname, `public/part2VEGFRmask.html` ),
				template: path.resolve( __dirname, 'src/part2VEGFRmask.html' ),
				inject:false
			}),
			new HtmlWebpackPlugin({
				filename: path.resolve( __dirname, `public/part3Surface.html` ),
				template: path.resolve( __dirname, 'src/part3Surface.html' ),
				inject:false
			})
		],
		resolve: {
			// mainFiles: [ "index", "index.eft" ],
			alias: {
				root      : path.resolve( __dirname ),
				src       : path.resolve( __dirname, "src/" ),
				components: path.resolve( __dirname, "src/components/" ),
				utils     : path.resolve( __dirname, "src/utils/" ),
				functional: path.resolve( __dirname, "src/utils/functional" ),
				fetch     : path.resolve( __dirname, "src/utils/fetch" ),
			},
			extensions: [ ".efml", ".json", ".js", ".eft" ], //在查找路径的时候，先检索efml文件，在检索js文件，后检索eft文件，所以使用ef。js的时候尽量用eft
			roots     : [ path.resolve( __dirname, "src" ) ]
		},
		optimization: {
			chunkIds: "named",
			usedExports: true,
		}
	};

	if( !production )
		ret.devtool = "cheap-module-source-map";
	return ret;
};
