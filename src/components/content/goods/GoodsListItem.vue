<template>
  <div class="GoodsListItem" @click="itemClick">
    <img v-lazy="goodsItem.show.img" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      // console.log("imgload");
      this.$bus.$emit("itemImgLoad");
      // console.log(this.$bus);
    },
    itemClick() {
      // console.log('跳转到详情页');
      this.$router.push("/detail/" + this.goodsItem.iid);
      // this.$router.push({
      //   path: '/detail',
      //   query:{

      //   }
      // })
    },
  },
};
</script>

<style scoped>
.GoodsListItem {
  width: 47%;
  padding-bottom: 40px;
  position: relative;
  /* margin-left: 5px; */
}

.GoodsListItem img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .collect {
  position: relative;
  left: 20px;
}
.goods-info .price {
  color: pink;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
