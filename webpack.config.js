var path=require("path");
//var uglify=require("uglifyjs-webpack-plugin");
var html=require("html-webpack-plugin");
//var uglifyPlugin=new uglify({test:/\.js$/});
var webSite={
    publicPath:"http://192.168.0.180:8080/"
}
var extractTextPlugin=require("extract-text-webpack-plugin");
var htmlPlugin=new html({
    minify:{
        removeAttributeQuotes:true
    },
    hash:true,
    template:"./src/index.html"
})
module.exports={
    entry:"./src/entry.js",
    output:{
        filename:"demo.js",
        path:path.resolve(__dirname,"dist"),
        publicPath:webSite.publicPath
    },
    module:{
        rules:[
          //  {
       //         test:/\.css$/,
      //          use:[{loader:"style-loader",},{loader:"css-loader"}]
        //    },
            {
              test:/\.css$/,
              use:extractTextPlugin.extract({
                  fallback:"style-loader",
                  use:"css-loader"
              })  
            },
            {
                test:/\.(png|jpg|jpeg)$/,
                use:[{
                    loader:"url-loader",
                    options:{
                        limit:500,
                        outputPath:"./images/"
                    }
                }]
            }
        ]
    },
    plugins:[htmlPlugin,new extractTextPlugin("./css/style.css")],
    devServer:{
        contentBase:path.resolve(__dirname,"dist"),
        host:"192.168.0.180",
        compress:true,
        port:8080
    }
}