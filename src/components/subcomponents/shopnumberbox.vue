<template>
  <div>
    <div class="mui-numbox"
         data-numbox-min="0"
         data-numbox-max="9">
      <button class="mui-btn mui-btn-numbox-minus"
              type="button"
              disabled="">
        -
      </button>
      <input id="test"
             class="mui-input-numbox"
             type="number"
             :value="initcount"
             @change="countChanged"
             ref="numbox" />
      <button class="mui-btn mui-btn-numbox-plus"
              type="button">+</button>
    </div>
  </div>
</template>
<style scoped></style>
<script>
import mui from '../../lib/mui/js/mui.min.js';
export default {
  data () {
    return {
      count: this.initcount
    };
  },
  mounted () {
    // 初始化数字选择框组件
    mui('.mui-numbox').numbox();
  },
  methods: {
    countChanged () {
      this.$store.commit('updataCarInfo', {
        no: this.goodId,
        count: this.$refs.numbox.value
      });
    }
  },
  props: ['initcount', 'goodId']
};
</script>
