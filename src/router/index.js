import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const syncRouter=[
	{
		path:'/',
		name: 'home',
		meta: { title: '主页'},
		component: () => import('@/views/index.vue'),
	},
  
];
/**
 * 重写路由的push方法  解决 Navigating to current location ("url") is not allowed
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export const asyncRouter=[
	
]
export const router= new Router({
  //mode: 'history',
  mode:'hash',
  base: process.env.BASE_URL,
  routes:syncRouter
})
