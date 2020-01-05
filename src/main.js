// import "./css/style.css";
import Vue from 'vue';
import app from './App.vue';
//导入路由模块
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//引入自己的路由
import router from './router.js';
// 注册 vuex
import Vuex from 'vuex';
Vue.use(Vuex);
//引入vue-resource
import vueResource from 'vue-resource';
Vue.use(vueResource);
//引入mint-ui
import { Header, Button, Swipe, SwipeItem, Spinner, Switch } from 'mint-ui';
// import { Button } from 'mint-ui';
// import { Swipe, SwipeItem } from 'mint-ui';
// import { Spinner } from 'mint-ui';
// import { Switch } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Spinner.name, Spinner);
Vue.component(Switch.name, Switch);
import 'mint-ui/lib/style.css';
//引入mui
import './lib/mui/css/mui.min.css';
//import './lib/mui/js/mui.min.js'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css';

var car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
	state: {
		car: car
	},
	mutations: {
		initCar(state, goodsinfo) {
			state.car.forEach(item => {
				item.count = 0;
			});
		},
		addTocar(state, goodsinfo) {
			var flag = false;
			state.car.some(item => {
				if (item.no == goodsinfo.no) {
					item.count += parseInt(goodsinfo.count);
					flag = true;
					return true;
				}
			});
			if (!flag) {
				state.car.push(goodsinfo);
			}
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		removeGood(state, no) {
			state.car.some((item, i) => {
				if (item.no == no) {
					state.car.splice(i, 1);
					return true;
				}
			});
			localStorage.setItem('car', JSON.stringify(state.car));
		},
		updataCarInfo(state, goodsinfo) {
			state.car.some(item => {
				if (item.no == goodsinfo.no) {
					item.count = parseInt(goodsinfo.count);
					console.log(item.count);
					return true;
				}
			});
			localStorage.setItem('car', JSON.stringify(state.car));
		}
	},
	getters: {
		getAllCount(state) {
			var c = 0;
			state.car.forEach(item => {
				c += parseInt(item.count);
				c = parseInt(c);
			});
			return c;
		},
		getCarCountAndPrice(state) {
			var o = {
				count: 0,
				price: 0
			};
			state.car.forEach(item => {
				if (item.selected) {
					o.count += item.count;
					o.price += item.count * item.price;
				}
			});
			return o;
		}
	}
});
var vm = new Vue({
	el: '#app',
	data: {},
	methods: {},
	render: function(getCompent) {
		//render 方法渲染的组件会替换el元素
		return getCompent(app);
	},
	router, //挂在路由
	store
});
