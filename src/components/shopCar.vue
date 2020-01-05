<template>
  <div>
    <div v-for="(item,index) in car"
         :key="index"
         class="goodItem">
      <div>{{item.name}}</div>
      <div class="goodItemDetail">
        <mt-switch v-model="item.selected"></mt-switch>
        <shopnumberbox :initcount="item.count"
                       :goodId="item.no"></shopnumberbox>
        <div @click="remove(item.no)">删除</div>
      </div>
    </div>
    <div class="goodTotel">
      <div>
        <div>商品总数<span>{{$store.getters.getCarCountAndPrice.count}}</span></div>
        <div>商品总价<span>{{$store.getters.getCarCountAndPrice.price}}</span></div>
      </div>
      <mt-button type="danger">去结算</mt-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.goodItem {
  margin-bottom: 20px;
  .goodItemDetail {
    display: flex;
    justify-content: space-around;
  }
}
.goodTotel {
  display: flex;
  span {
    color: red;
  }
  button {
    margin-left: 50px;
  }
}
</style>
<script>
import shopnumberbox from './subcomponents/shopnumberbox.vue';
export default {
  data () {
    return {
      car: [],
      value: false
    }
  },
  created () {
    this.car = this.$store.state.car;
    //this.$store.commit('initCar');
  },
  methods: {
    remove (no) {
      this.$store.commit('removeGood', no)
    }
  },
  components: {
    shopnumberbox
  }
}
</script>
