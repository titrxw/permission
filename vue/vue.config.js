module.exports = {
   devServer: {
     port: 9090,
     proxy: {
       '/homeservice': { //使用"/api"来代替"http://f.apiplus.c" 
         target: 'http://baidu/api', //源地址 
         changeOrigin: true, //改变源 
         pathRewrite: {
           '^/homeservice': '/homeservice' //路径重写 
         }
       }
     }
   },
  lintOnSave: false,
  runtimeCompiler: true,
  baseUrl: './'
}