<template>
  <div class="goodsInfo">
    <img :src="goodsInfo[id - 1].imgSrc" />
    <div class="detail">
      <div>{{ goodsInfo[id - 1].name }}</div>
      <div>价格：{{ goodsInfo[id - 1].price }}</div>
      <div>
        <span>购买数量：</span>
        <numberBox class="_numberBox"
                   @getcount="handleCount"></numberBox>
      </div>
      <mt-button type="primary"
                 size="small">立即购买</mt-button>
      <mt-button type="danger"
                 size="small"
                 @click="addToShopcar(goodsInfo[id - 1])">加入购物车</mt-button>
    </div>
    <div class="descibe"></div>
  </div>
</template>
<style lang="less" scoped>
.goodsInfo {
  height: 100%;
  img {
    width: 100%;
    height: 35%;
  }
  .detail {
    overflow: hidden;
    width: 100%;
    height: 30%;
    background: #fff3ee;
    div {
      margin: 10px;
    }
    ._numberBox {
      display: inline-block;
    }
  }
}
</style>
<script>
import numberBox from '../subcomponents/numberBox.vue';
export default {
  data () {
    return {
      id: this.$route.params.id,
      selectedCount: 0,
      goodsInfo: [
        {
          name: '冲绳黑糖拿铁',
          no: 1,
          price: 28,
          imgSrc: '../../assets/coffeeInfo1.jpg',
          describe: '好喝'
        },
        {
          name: '桃桃芝士红宝石茶',
          no: 2,
          price: 36,
          imgSrc: '../../assets/coffeeInfo2.jpg',
          describe: '特别好喝'
        },
        {
          name: '芥末腰果',
          no: 3,
          price: 18,
          imgSrc: '../../assets/coffeeInfo3.jpg',
          describe: '很好吃'
        }
      ]
    };
  },
  created: function () {
    //this.$store.commit('initCar');
  },
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
      console.log(goodsinfo);
      this.$store.commit('addTocar', goodsinfo);

    }
  },
  components: {
    numberBox
  }
};
</script>
