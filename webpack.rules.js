const { loader } = require("mini-css-extract-plugin");
module.exports = [
	// {
	// 	test: /native_modules[/\\].+\.node$/,
	// 	use: "node-loader"
	// },
	// {
	// 	test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
	// 	parser: { amd: false },
	// 	use: {
	// 		loader: '@vercel/webpack-asset-relocator-loader',
	// 		options: {
	// 			outputAssetBase: 'native_modules',
	// 		},
	// 	},
	// },
	{
		test  : /\.md$/,
		loader: "./src/utils/loaders/markdown-loader/loader.js"
	},
	{
		test  : /\.mdc$/,
		loader: "./src/utils/loaders/markdown-loader/loaderComplete.mjs"
	},
	{
		test  : /\.tex$/,
		loader: "./src/utils/loaders/katex-loader.js"
	},
	{
		test  : /\.ef(t|ml)?$/, //eft和efml使用的loader是一样的
		loader: "eft-loader",
	},
	{
		test: /\.mcss$/,
		use : [ { loader }, { loader: "css-loader", options: { modules: true } }	]
	},
	{
		test: /\.css$/,
		use : [ { loader }, { loader: "css-loader" } ]
	},
	{
		test: /\.less$/,
		use : [ { loader }, { loader: "css-loader" }, { loader: "less-loader" } ]
	},
	{
		test: /\.lmss$/, //使用lmss的时候，所选的类会被转化为哈希值，防止变量重名。
		use : [ { loader }, { loader: "css-loader", options: { modules: true } }, { loader: "less-loader" } ]//使用lmss的时候进行模块化处理
	},
	{
		test: /\.svg$/i,
		type: "asset/source"
	},
	{
		test     : /\.(png|jpg|jpeg|gif)$/i,
		type     : 'asset/resource',
		generator: {
			filename: "images/[name][ext][query]"
		}
	},
	{
		test     : /\.(pdf)$/i,
		type     : 'asset/resource',
		generator: {
			filename: "pdfs/[name][ext][query]"
		}
	},
	{
		test     : /\.(woff|woff2|eot|ttf|otf)$/i,
		type     : 'asset/resource',
		// use: [{loader:"file-loader"}],
		generator: {
			filename: "fonts/[name][ext][query]"
		}
	},
	{
		test : /\.(ico)$/,
		type : "asset/resource",
		generator: {
			filename: "[name][ext][query]"
		}
	}
];
