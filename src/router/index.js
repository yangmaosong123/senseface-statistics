import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router);


Vue.prototype.__routes = [
  {
    path: '/',
    component: App,
    desc: "首页",
  }
];

export default new Router({
  routes: Vue.prototype.__routes
})
