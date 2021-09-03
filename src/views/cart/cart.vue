<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list></cart-list>

    <!-- 底部的汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  data() {
    return {
      message: 1,
    };
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // },
    //数组是一一对应的关系  不可修改
    // ...mapGetters([cartLength]),

    //对象可修改
    ...mapGetters({
      length: "cartLength",
      // list:'cartList'
    }),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 99;
  /* position: absolute;
  top: 0;
  right: 0;
  left: 0; */
}
</style>
