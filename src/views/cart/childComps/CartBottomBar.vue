<template>
  <div class="bottom-bar">
    <div class="all">
      <check-button
        @click.native="checkClick"
        :is-checked="isSelectAll"
        class="check-button"
      />
      <span>全选</span>
    </div>

    <div class="price">合计：￥{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/CheckButton/CheckButton.vue";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // return !(this.$store.state.cartList.filter((item) => !item.checked).length)
      if (this.$store.state.cartList.length === 0) {
        return false;
      }
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      // console.log('全选');
      // return !this.$store.state.cartList.forEach(
      //   (item) => (item.checked = !this.isSelectAll)
      // );

      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        // console.log('弹出toast');
        this.$toast.show("对不起，没有要结算的商品");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;

  height: 40px;
  background-color: rgb(228, 228, 228);
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
}
.check-button {
  /* line-height: 22px; */
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.all {
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
}

.price {
  padding-top: 16px;
  padding-left: 30px;
  font-size: 15px;
}

.calculate {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(255, 72, 0);
  width: 80px;
  font-size: 15px;
  padding-top: 15px;
  padding-left: 10px;
  color: #fff;
}
</style>
