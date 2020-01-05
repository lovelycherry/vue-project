<template>
  <div class="content">
    <div class="left"
         ref="left">
      <ul>
        <li v-for="(item, index) in muenulist"
            :key="index"
            @click="selectItem(index, $event)"
            :class="{ selected: currentIndex === index }">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="right"
         ref="right">
      <ul>
        <li v-for="(item, index) in itemList"
            :key="index"
            class="food-list-hook">
          <h1>{{ item.tit }}</h1>
          <ul v-for="(item, index) in item.kind"
              :key="index">
            <li @click="gotoGoodsInfo(item.no)">{{ item.name }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import axios from 'axios';
export default {
  data () {
    return {
      muenulist: [],
      itemList: [],
      List: [
        {
          "tit": "人气top",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "大师咖啡",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "小鹿茶精选",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "瑞纳冰",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "鲜榨果蔬汁",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "经典饮品",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "健康轻食",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "瑞幸坚果",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "幸运小食",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "周边潮品",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        },
        {
          "tit": "咖啡豆",
          "kind": [
            {
              "name": "冲绳黑糖拿铁",
              "no": 1
            },
            {
              "name": "桃桃芝士红宝石茶",
              "no": 2
            },
            {
              "name": "芥末腰果",
              "no": 3
            }
          ]
        }
      ],
      scrollY: 0,
      listHeight: []
    };
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll(), this._calculateHeight();
    });  },
  created () {
    axios.get('/api/localData').then(res => {
      if (res.data.errno === 0) {
        this.muenulist = res.data.data.muenulist;
        console.log(this.muenulist);
      }
    });
    axios.get('/api/localData').then(res => {
      if (res.data.errno === 0) {
        this.itemList = res.data.data.itemList;
        console.log(this.itemList);
      }
    });
  },
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
  },
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
    },
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
    },
    selectItem (index, event) {
      let foodList = this.$refs.right.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.rightScroll.scrollToElement(el, 300);
    },
    gotoGoodsInfo (id) {
      this.$router.push({ path: `/shop/goodsInfo/${id}` });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  position: fixed;
  top: 20%;
  bottom: 50px;
  left: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  .left {
    width: 30%;
    height: 100%;
    ul {
      padding-left: 0;
      li {
        list-style: none;
        padding-top: 20px;
        padding-bottom: 20px;
        background: #669999;
        box-sizing: border-box;
        text-align: center;
        font-weight: 300;
      }
      .selected {
        background-color: #fff;
      }
    }
  }
  .right {
    width: 70%;
    height: 100%;
    ul {
      padding-left: 0;
      li {
        list-style: none;
        box-sizing: border-box;
        text-align: center;
        border-bottom: 0.5px solid #669999;
        h1 {
          display: inline-block;
          background: #669999;
          width: 100%;
          font-size: 20px;
          font-weight: 400;
          margin: 0;
        }
        li {
          padding-top: 30px;
          padding-bottom: 30px;
        }
      }
    }
  }
}
</style>
