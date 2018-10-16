import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import PhotoWarning from '@/components/photoWarning'
Vue.use(Router);


Vue.prototype.__routes = [
  {
    path: '/',
    component: App,
    desc: "首页",
    children:[
      {
      path: '/photoWarning',
      name: 'photoWarning',
      component: PhotoWarning,
      desc: "数据统计表",
    },
    
    ]
    
  }
];

export default new Router({
  routes: Vue.prototype.__routes
})
