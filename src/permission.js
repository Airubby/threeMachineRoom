import {router} from '@/router/index'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式

routerGo();
async function routerGo(){
    router.beforeEach((to, from, next) => {
        // NProgress.start()
        const whiteList = ['/401','/404'] // 不重定向白名单
        if (to.path!=="/"&&whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            if(JSON.stringify(to.meta)!="{}"){
                next() 
            }else{
                next('/404') 
                console.log("访问的页面不存在")
            }
        }
    })
    
    router.afterEach((to,from) => {
        let title=to.meta.title?`${to.meta.title}`:'一体化机柜';
        window.document.title = title;
        // NProgress.done() // 结束Progress
    })
}

