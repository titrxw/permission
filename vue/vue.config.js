module.exports = {
    devServer: {
        port: 9090,
        proxy: {
            '/permiss': { //使用"/api"来代替"http://f.apiplus.c" 
                target: 'http://localhost/php-framework/index.php/', //源地址 
                changeOrigin: true //改变源 
            }
        }
    },
    lintOnSave: false,
    runtimeCompiler: true,
    baseUrl: './',
    // https://segmentfault.com/a/1190000010613010
    // http://www.jintiankansha.me/t/Gyy9pDe3Ei
    // configureWebpack: {
    //   plugins: [
    //     new PrerenderSpaPlugin(
    //       path.join(__dirname, 'dist'),
    //        需要预渲染的路由   路由模式需要切换成history
    //       ['/', '/login', '/platform/company', '/platform/comment']
    //     )
    //   ]
    // }
}