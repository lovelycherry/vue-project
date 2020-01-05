<template>
  <div class="mainPage">
    <!-- 这个标记用于书写组件的结构 -->
    <router-view></router-view>
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/main"
                   class="mui-tab-item mui-active">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/shop/menu"
                   class="mui-tab-item">
        <span class="mui-icon mui-icon-list"></span>
        <span class="mui-tab-label">菜单</span>
      </router-link>
      <router-link to="/shopCar"
                   class="mui-tab-item">
        <span class="mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getAllCount}}</span></span>
        <span class="mui-tab-label shopCar">购物车</span>
      </router-link>
      <router-link to="/config"
                   class="mui-tab-item">
        <span class="mui-icon mui-icon-person"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>
<style lang="less" scoped>
.mainPage {
  height: 100%;
  touch-action: none;
  .shopCar {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
<script>
import mui from './lib/mui/js/mui.min.js';
export default {
  data: function () {
    return {
      name: '根组件'
    }
  },
  methods: {},
  created () {
    //localStorage.clear();
    console.log('已经初始化');
    //解决tab不能跳转问题
    mui('body').on('tap', 'a', function () { document.location.href = this.href; });
    // document.addEventListener('touchstart', function (event) {
    //   // 判断默认行为是否可以被禁用
    //   if (event.cancelable) {
    //     // 判断默认行为是否已经被禁用
    //     if (!event.defaultPrevented) {
    //       event.preventDefault();
    //     }
    //   }
    // }, false);
  }
}
</script>
