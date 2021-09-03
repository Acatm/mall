<template>
  <!--   -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      props: {
        probeType: {
          type: Number,
          default: 0,
        },
        pullUpLoad: {
          type: Boolean,
          default: false,
        },
      },
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //在不需要的时候 设置为3会影响性能
      probeType: this.probeType,
      // pullUpLoad: this.pullUpLoad,
      pullUpLoad: true,
      click: true,
    });

    //2.监听滚动位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    //3、上拉加载
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载更多");
      setTimeout(() => {
        this.scroll.finishPullUp();
      }, 2000);
      this.$emit("pullingUp");
    });

    //4.返回顶部
    this.scroll.scrollTo(0, 0);

    // ObserveDom=true
    // ObserveImage=true
  },
  methods: {
    scrollTo(x, y, time = 1500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      // console.log("----------");
      this.scroll && this.scroll.refresh();
    },
  },
  destroyed() {
    // console.log('home destroyed');
  }
};
</script>

<style scoped>
</style>
