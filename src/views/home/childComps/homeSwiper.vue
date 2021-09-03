<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { swiper, swiperItem } from "components/common/swiper";

export default {
  name: "homeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad:false
    };
  },
  components: {
    swiper,
    swiperItem,
  },
  methods: {
    imageLoad() {
      if(!this.isLoad){
              // console.log("111");
      this.$emit("swiperImageLoad");
      this.isLoad=true;
      }

    },
  },
};
</script>

<style scoped>
</style>
