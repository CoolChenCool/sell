/**
 * Created by Administrator on 2017/7/13.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '../components/goods/goods.vue';
import seller from '../components/seller/seller.vue';
import ratings from '../components/ratings/ratings.vue';
Vue.use(VueRouter);
export default new VueRouter({
  linkActiveClass: `active`,
  base: __dirname,
  mode: 'history',
  routes: [
    {path: '/', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ]
});
