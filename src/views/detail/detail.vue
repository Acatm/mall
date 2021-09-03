<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
    ></detail-nav-bar>

    <scroll class="content" :probe-type="3" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info ref="baseInfo" :goods="goods"></detail-base-info>
      <detail-shop-info ref="shopInfo" :shop="shop"></detail-shop-info>
      <detail-goods-info
        ref="goodsInfo"
        :detail-info="detailInfo"
        @imgLoad="imgLoad"
      ></detail-goods-info>
    </scroll>

    <detail-bottom-bar
      @addToCart="addToCar"
      class="bottombar"
    ></detail-bottom-bar>

    <back-top
      class="backtop"
      @click.native="backClick"
      v-show="isShowBackTop"
    ></back-top>

    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
// import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
// import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import BackTop from "components/content/backTop/BackTop";

import scroll from "components/common/scroll/Scroll";
// import Toast from "components/common/toast/Toast";

import { getDetail, Goods, Shop } from "network/detail.js";
import { debounce } from "common/utiles.js";
import { itemImgListener } from "common/mixin.js";

import { mapActions } from "vuex";

export default {
  name: "detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailBottomBar,
    // DetailCommentInfo,
    DetailGoodsInfo,
    // DetailParamInfo,
    BackTop,

    scroll,
    // Toast,
  },
  mixins: [itemImgListener],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemImgListener: null,
      themeTopYs: [0, 1000, 2000, 3000],
      isShowBackTop: false,
      // message: "",
      // show: false,
    };
  },
  created() {
    //1.保存传入得iid
    this.iid = this.$route.params.iid;
    // console.log(this.$route.params.iid);

    //2.根据iid请求详细得数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      //1.获取顶部图片的轮播数据
      this.topImages = res.result.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.获取店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //4.获取商品详细的信息
      this.detailInfo = data.detailInfo;

      //根据最新的数据，对应DOM是已经被渲染出来的
      //在渲染完之后获取页面元素的offsetTop
    });
  },
  methods: {
    ...mapActions({
      addCart: "addCart",
    }),
    imgLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
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
    addToCar() {
      // console.log('---------');
      //获取购物车需要展示的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.price;
      product.iid = this.iid;
      //将商品添加到购物车
      // this.$store.commit("addCart", product);
      // this.$store.dispatch(ADD_CART, product).then((res) => {
      //   console.log(res);
      // });

      this.addCart(product).then((res) => {
        console.log(res);
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        // }, 1500);
        this.$toast.show(res);
      });

      //添加到购物车成功
    },
  },
  mounted() {
    // console.log(111);
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.content {
  position: absolute;
  overflow: hidden;
  /* bottom: 44px; */
  background-color: #fff;
  height: calc(100% - 44px);
  /* z-index: 10; */
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.bottombar {
  position: absolute;
  background-color: #fff;
}
</style>
