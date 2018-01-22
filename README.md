###打包css文件
	####不分离css (会嵌套在入口js里面，不会生成.css出来的)
		1.需要下载两个loader(style-loader,css-loader)(>如果是loader则不需要声明引入，插件则需要）
		2.在webpack.config.js的module需要进行如下配置
				module:{
					rules:[
						{
							test:/\.css$/,
							use:[{loader:"style-loader"},{loader:"css-loader"}]
						}
					]
				}
			对于其中的use有三种写法：
			可以写成这样：		use:["style-loader","css-loader"]
			也可以写成这样： loader:["style-loader","css-loader"]
	
	####分离css (>分离css和不分离css再webpack.config.js里面不能同时存在)
		1.需要下载插件extract_text_webpack_plugin
		2.var extractTextWebpack=require("extract_text_webpack_plugin");
			module.exports = {
				module: {
					rules: [
					  {
						test: /\.css$/,
						use: extractTextPlugin.extract({
						  fallback: "style-loader",
						  use: "css-loader"
						})
					  }
					]
				},
			    plugins: [
					new extractTextPlugin("/css/style.css"), //new extractTextPlugin()里面的参数是生成新的css所建的路径及文件，
					//可以在里面修改生成新的css的文件名，比如"/css/index.css"
				]
			}
			
###压缩js文件
	1.var uglify=require("uglify-webpack-plugin")  //<插件webpack自带只需要引入就可以，不需要下载.
	2.var uglify=new uglify();
	3.  plugins: [uglify];
	
###打包Html
	1.下载html-webpack-plugin插件
	2. var html=require("html-webpack-plugin");
	3.  var htmlPlugin=new html({
		minify:{
			removeAttributeQuotes:true //主要是去除像id,class,name...这类的引号
		}，
		hash:true,  //hash设置为true可以避免缓存
		template:'./src/index.html'  //开发环境所需html所在的路径
	})
	4. plugins: [htmlPlugin];
	
###打包图片
    1.下载file-loader,url-loader
	2.module:{
				rules:[
					{
						test:/\.css$/,
						use:[{
								loader:"url-loader",
								options :{
									limit:200, //图片小于200就转成base64编码形式，如果大于200就转成图片形式
									outputPath:"./images/"  //图片存入生产环境中的路径
								}
							}]
					}
				]
			}
			
	>问题：打包完成后会发现图片路径找不到？
	 //引入绝对路径的概念          
	var webSite={
		publicPath:"http://192.168.0.180:8080/"
	}  
	module.exports={
    entry:"./src/entry.js",
    output:{
        filename:"demo.js",
        path:path.resolve(__dirname,"dist"),
        publicPath:webSite.publicPath  //通过此处引入绝对路径可以解决图片找不到的问题
    },
	module:{
				rules:[
					{
						test:/\.css$/,
						use:[{
								loader:"url-loader",
								options :{
									limit:200, //图片小于200就转成base64编码形式，如果大于200就转成图片形式
									outputPath:"./images/"  //图片存入生产环境中的路径
								}
							}]
					}
				]
			}
	}		
	
	
	
	
	