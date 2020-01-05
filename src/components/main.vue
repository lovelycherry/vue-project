<template class="mainPage">
  <div class="main">
    <div class="head">天台拾光</div>
    <mt-swipe :auto="4000">
      <mt-swipe-item><img :src="imgUrl[0]" /></mt-swipe-item>
      <mt-swipe-item><img :src="imgUrl[1]" /></mt-swipe-item>
      <mt-swipe-item><img :src="imgUrl[2]" /></mt-swipe-item>
    </mt-swipe>
    <div class="mui-content">
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
    </div>
    <div class="recommend">美味推荐</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgUrl: [
        '../assets/coffee1.jpg',
        '../assets/coffee2.jpg',
        '../assets/coffee3.jpg'
      ]
    }
  }
}
</script>
<style>
body {
  height: 100vh;
}
</style>
<style lang="less" scoped>
.main {
  height: 100%;
  .head {
    width: 100%;
    height: 12px;
    position: fixed;
    text-align: center;
    z-index: 1;
    color: #336666;
    font-weight: 600;
  }
  .mint-swipe {
    height: 240px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .mui-content {
    height: 30%;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      float: left;
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
      color: #669999;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
      border-right: 1px solid white;
      border-bottom: 1px solid white;
    }
    .mui-table-view {
      height: 100%;
    }
    .mui-table-view:first-child {
      margin-top: 0;
    }
    .mui-col-xs-4 {
      width: 50%;
      height: 50%;
    }
  }
  .recommend {
    color: #336666;
    margin-left: 5px;
  }
}
</style>
