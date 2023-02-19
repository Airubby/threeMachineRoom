import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export const syncRouter = [
	{
		path: "/",
		name: "home",
		redirect: "/room",
		meta: { title: "主页" },
		component: () => import("@/views/index.vue"),
	},
	{
		path: "/test",
		name: "tst",
		meta: { title: "test" },
		component: () => import("@/views/test/index.vue"),
	},
	{
		path: "/room",
		name: "room",
		meta: { title: "机房" },
		component: () => import("@/views/room/index.vue"),
	},
	{
		path: "/rack",
		name: "rack",
		meta: { title: "机柜" },
		component: () => import("@/views/rack/index.vue"),
	},
];
/**
 * 重写路由的push方法  解决 Navigating to current location ("url") is not allowed
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return routerPush.call(this, location).catch((error) => error);
};
export const asyncRouter = [];
export const router = new Router({
	//mode: 'history',
	mode: "hash",
	base: process.env.BASE_URL,
	routes: syncRouter,
});
