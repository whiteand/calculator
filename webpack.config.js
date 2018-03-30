module.exports = {
	entry: "./js/main.js",
	output:{
    filename:"./js/bundle.js"
	},
	module: {
  	rules:[
  		{test: /\.js$/,exclude: /(node_modules|bower_components)/,use: {loader: 'babel-loader',options: {presets: ['@babel/preset-env']}}},
  		{test: /\.less$/,use: [{loader: "style-loader"},{loader: "css-loader"},{loader: "less-loader"}]},
  		{test: /\.(png|jpg|gif)$/,use: [{loader: 'file-loader',options: {limit: 8192,useRelativePath: true}}]},
  	],
	},
	watch: true,
	watchOptions: {
	  aggregateTimeout: 300,
	  poll: 1000
	} 	
}