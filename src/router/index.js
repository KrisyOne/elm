import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'
import VueGoods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
Vue.use(Router)
Vue.use(VueResource)
//export default new Router({
//  mode:'history',
//  routes: [
// ,{
//      path:'/goods',
//      component:VueGoods
//    },{
//      path:'/ratings',
//      component:Ratings
//    },{
//      path:'/seller',
//      component:Seller
//    }
//  ]
//})

const routes= [
  {
    path:'/',
    redirect:'/goods'
  }
  ,{
    path:'/goods',
    component:VueGoods
  },{
    path:'/ratings',
    component:Ratings
  },{
    path:'/seller',
    component:Seller
  }
];
const router=new Router({
  routes:routes
})
export default router;
