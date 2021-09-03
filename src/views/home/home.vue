<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top
      class="backtop"
      @click.native="backClick"
      v-show="isShowBackTop"
    ></back-top>
  </div>
</template>

<script>
import homeSwiper from "./childComps/homeSwiper.vue";
import recommendView from "./childComps/recommendView.vue";
import featureView from "./childComps/featureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utiles.js";

export default {
  name: "home",
  components: {
    homeSwiper,
    recommendView,
    featureView,
    NavBar,
    TabControl,
    GoodsList,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      dKeywords: [],
      keywords: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 事件监听相关的代码
     */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // console.log("返回顶部");
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //判断BackTop是否显示
      // console.log(position);
      this.isShowBackTop = position.y < -1000;

      //决定tabCoutrol是否吸顶（position：fixed）
      this.isTabFixed = position.y < -this.tabOffsetTop;
    },
    loadMore() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
      // this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      // console.log("111");
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关的代码
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.dKeywords = res.data.dkeyword;
        this.keywords = res.data.keywords;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(11);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
  mounted() {
    //3.监听item中图片加载完成
    // this.$bus.$on("itemImgLoad", () => {
    // this.$refs.scroll.refresh();
    // console.log("----------");
    // });
    const refresh = debounce(this.$refs.scroll.refresh);
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
    //2.获取tapControl的offsetTop对象
    //多有组件都有一个$el，获取组件中的元素
    //直接获取是不正确的，这个时候虽然dom挂载但是图片未加载
    // console.log((this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop));
  },
  deactivated() {
    //取消全局函数的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
}

.tab-control {
  /* position: sticky; */
  /* top: 44px; */
  position: relative;
  z-index: 11;
}

/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 10;
} */

.content {
  /* height: 575px; */
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
}
</style>
