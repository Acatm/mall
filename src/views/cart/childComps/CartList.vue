<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  data() {
    return {};
  },
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters({
      cartList: "cartList",
    }),
  },
  activated() {
    // console.log('11111');
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: 100vh - 49px;
}
.content {
  width: 100%;

  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 89px;
}
</style>
