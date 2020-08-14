module.exports = {
    // 基本路径
    publicPath: './',
    //baseUrl: process.env.NODE_ENV === "production" ? "./" : "/"
    // 输出文件目录
    outputDir: 'show',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: (config) => {
    
    },
    configureWebpack: (config) => {
        // if (process.env.NODE_ENV === 'production') {
        //     // 为生产环境修改配置...
        //     config.mode = 'production';
        // } else {
        //     // 为开发环境修改配置...
        //     config.mode = 'development';
        // }
        // Object.assign(config, {
        //     // 开发生产共同配置
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname, './src'),
        //         }
        //     }
        // });
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            //为每个css引入公共需要引入的样式
            // less:{
            //     data:`@import "@/assets/public.less"`
            // }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8081,
        https: false,
        hotOnly: false,
        // 设置代理
        // proxy: {
        //     // '/api': {
        //     // target: 'https://cnodejs.org', // 你接口的域名
        //     //     secure: false, // 如果是https接口，需要配置这个参数
        //     //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        //     //     pathRewrite:{
        //     //     '^/api':'/api/v1/'
        //     //     }
		//     // }
        // },
        before: app => {
        }
    },
    // 第三方插件配置
    pluginOptions: {}
}