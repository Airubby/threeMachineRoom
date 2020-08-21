import Vue from 'vue'
import App from './App.vue'
import {router} from './router/index'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/basic.less'

Vue.prototype.$store=store
Vue.use(ElementUI);
Vue.config.productionTip = false

function init() {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}
init();
