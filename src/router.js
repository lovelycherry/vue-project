import VueRouter from 'vue-router';
import main from './components/main.vue';
import message from './components/message.vue';
import shopCar from './components/shopCar.vue';
import config from './components/config.vue';
import active from './components/active/active.vue';
import activePage from './components/active/activePage.vue';
import menu from './components/shop/menu.vue';
import goodsInfo from './components/shop/goodsInfo.vue';

var router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/main' },
		{ path: '/main', component: main },
		{ path: '/message', component: message },
		{ path: '/shopCar', component: shopCar },
		{ path: '/config', component: config },
		{ path: '/active', component: active },
		{ path: '/active/activePage/:id', component: activePage, name: activePage },
		{ path: '/shop/menu', component: menu },
		{ path: '/shop/goodsInfo/:id', component: goodsInfo }
	]
});
export default router;
