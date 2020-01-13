# vue1
这是一个类似于瑞幸咖啡的咖啡点餐的h5项目

# 技术栈
vue + vuex + vue-router + axios + webpack + ES6 + less + flex

##项目运行
``` bash
# 安装依赖
npm install

# 开启本地服务器 localhost:8080
npm run dev
```

## 部分技术说明
#### 一、 axios 的使用
本项目借助node和express模拟了数据，具体如下：
首先在webpack.config.js文件中添加以下配置（使用express模拟了服务器）：
```
const express = require('express');
const app = express(); //请求server
const appData = require('./src/mock/news.json'); //加载本地数据文件
const localData = appData; //获取对应的本地数据
const apiRoutes = express.Router();
app.use('/api', apiRoutes); //通过路由请求数据
```
接着在devServer中对请求接口进行配置（before在服务内部的所有其他中间件之前， 提供执行自定义中间件的功能。 这可以用来配置自定义处理程序。）：
```
before(app) {
			app.get('/api/localData', (req, res) => {
				res.json({
					errno: 0,
					data: localData
				});
			});
		}
```
其次要在/src/mock/目录下新建news.json，写入需要的数据，如：

```
 "message": [
		{
			"name": "小丸子",
			"time": "2019/10/12 上午12:20",
			"cont": "小鹿茶真好喝啊"
		},
		{
			"name": "小丸子1",
			"time": "2019/10/14 上午13:20",
			"cont": "牛乳茶也好喝"
		},
		{
			"name": "小丸子3",
			"time": "2019/10/15 上午13:20",
			"cont": "拿铁有点苦"
		}
	]
```

接口写好了，就可以使用它了，在这里我们用axios来发送http请求，先安装axios（也可以使用vue-resource，但自从vue2出来后，Vue.js的作者尤雨溪微博说将不维护它了，推荐用axios）

```
npm install axios --save
```

请求接口方法如下：

```
import axios from 'axios';
axios.get('/api/localData').then(res => {
			if (res.data.errno === 0) {
				this.getMessage = res.data.data.message;
				console.log(this.getMessage);
			}
		});
```

html代码如下

```
<div class="floor" v-for="(item, index) in getMessage" :key="index">
			<div class="tit">第{{ index + 1 }}层 用户:{{ item.name }}</div>
			<div class="tit1">发表时间{{ item.time }}</div>
			<div>{{ item.cont }}</div>
</div>
```

#### 二、 组件的使用：Mint-UI和MUI
Mint-UI的使用：
安装
```
npm install mint-ui --save
```
引入需要的组件和样式
```
import { Header, Button, Swipe, SwipeItem, Spinner, Switch } from 'mint-ui';
import 'mint-ui/lib/style.css';
```
使用
例：Vue.component(Header.name, Header);

MUI的使用：
安装
```
从github上下载MUI的文件：https://github.com/dcloudio/mui
只把所需的css，js文件放在项目中
```
引入
```
//引入mui
import './lib/mui/css/mui.min.css';
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css';
```
使用
```
在MUI文件的examples中找到自己需要的组件，如grid组件：
<ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 cell1">
          <router-link to="/shop/menu">
            <div class="mui-media-body">现在下单</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/message">
            <div class="mui-media-body">留言板</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 cell3">
          <router-link to="/active">
            <div class="mui-media-body">最新活动</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <div class="mui-media-body">周边</div>
          </a>
        </li>
      </ul>
   ```
   
#### 三、better-scroll 运用
github地址：https://github.com/ustbhuangyi/better-scroll

安装

 ```npm install better-scroll --save```
 
引入better-scroll

 ```import BScroll from 'better-scroll'```
 
实例化的时候需要一个dom，注意要在dom渲染完成后（this.$nextTick）初始化better-scroll才能生效, 部分代码如下
将内层的高度与外层的wrapper的高度做比较，内层比较高的时候就会产生滚动

```
mounted (){
  this.$nextTick(() => {
	 this._initScroll()
	 // 初始化计算foodList的高度
	 this._calculateHeight()
  })
}
methods: {
   _initScroll () {
      this.leftScroll = new BScroll(this.$refs.left, {
        click: true
      });
      this.rightScroll = new BScroll(this.$refs.right, {
        click: true,
        probeType: 3
      });
      this.rightScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    }
}

```

实现左菜单和右侧食品列表联动

```
// 将每个分类下的food的高度相加，得到每个分类下对应的foodlist的总高度， 然后保存在this.listHeight数组中
//(bug解决:这里使用了一个定时器为了保证在页面dom渲染完成之后再获取元素的length属性，不然获取不到）
_calculateHeight () {
      setTimeout(() => {
        let foodList = this.$refs.right.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }, 1000)
    }

```
右侧的滚动会激活对应的菜单项

```
computed: {
  currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (this.scrollY >= height1 && this.scrollY < height2) {
          return i;
        }
      }
      return 0;
    }
}
```
[要给菜单项绑定激活样式]
获取到currentIndex后，在left的li中绑定一个class:class="{'current':currentIndex === index}",当currentIndex和item对应的index相等时，设置current的样式。这样就可以左右联动了。

```
<li v-for="(item, index) in muenulist"
            :key="index"
            @click="selectItem(index, $event)"
            :class="{ selected: currentIndex === index }">
          {{ item }}
        </li>
```

点击左侧菜单 => 右侧联动

* 这里用了better-scroll的一个方法： scrollToElement(el, time, offsetX, offsetY, easing)

滚动到某个元素，el（必填）表示 dom 元素，time 表示动画时间，offsetX 和 offsetY 表示坐标偏移量，easing 表示缓动函数


```
selectItem (index, event) {
      let foodList = this.$refs.right.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.rightScroll.scrollToElement(el, 300);
    }
```
#### 四、添加购车组件 
这里用到了vuex状态管理工具
安装
```
import Vuex from 'vuex';
Vue.use(Vuex);
```

在实例中声明store
```
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
```

定义状态的属性和方法

从本地存储中获取car变量若没有则定义为数组，并对car进行状态的管理
```
var car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
	state: {
		car: car
	},
  //定义一些方法，在其他的页面可以调用，可以随时对car中的数据进行操作
	mutations: {
    //初始化购物车
		initCar(state, goodsinfo) {
			state.car.forEach(item => {
				item.count = 0;
			});
		},
    //添加到购物车，若购物车中此物品存在则数量加一，若不存在则把物品新添进购物车
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
    //删除购物车中的物品
		removeGood(state, no) {
			state.car.some((item, i) => {
				if (item.no == no) {
					state.car.splice(i, 1);
					return true;
				}
			});
			localStorage.setItem('car', JSON.stringify(state.car));
		},
    //更新购物车信息
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
  //这里对数据进行处理
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
```

使用
```
//添加购物车
methods: {
    handleCount (count) {
      this.selectedCount = count;
    },
    addToShopcar (data) {
      var goodsinfo = {
        no: data.no,
        name: data.name,
        price: data.price,
        count: parseInt(this.selectedCount),
        selected: true
      }
      //调用store中car的方法
      this.$store.commit('addTocar', goodsinfo);
    }
  }
  
 //删除商品
 methods: {
    remove (no) {
      this.$store.commit('removeGood', no)
    }
  }
  
 //更新购物车中商品
  methods: {
    countChanged () {
      this.$store.commit('updataCarInfo', {
        no: this.goodId,
        count: this.$refs.numbox.value
      });
    }
  }
  
 //购物车中数目展示
 <div>商品总数<span>{{$store.getters.getCarCountAndPrice.count}}</span></div>
 <div>商品总价<span>{{$store.getters.getCarCountAndPrice.price}}</span></div>
```
