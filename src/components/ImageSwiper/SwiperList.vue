<template>
  <div class="hello-world">
    <transition name="fade">
      <swiper id="swiperBox" v-bind:options="swiperOption" ref="mySwiper">
        <!-- 第一页 -->
        <swiper-slide class="swiper-slide1">
          <div class="page">
            <h3>第一页</h3>
          </div>
        </swiper-slide>
        <!-- 第二页 -->
        <swiper-slide class="swiper-slide2">
          <div class="page">
            <h3>第二页</h3>
          </div>
        </swiper-slide>
        <!-- 第三页 -->
        <swiper-slide class="swiper-slide3">
          <div class="page">
            <h3>第三页</h3>
          </div>
        </swiper-slide>
        <!-- 第三页 -->
        <swiper-slide v-if="test" class="swiper-slide3">
          <div class="page">
            <h3>第4页</h3>
          </div>
        </swiper-slide>
      </swiper>
    </transition>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import SwiperOption from "@/utils/swiperOption.js";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    test: {
      type: Boolean,
    },
  },
  data() {
    return {
      swiperOption: { ...SwiperOption, direction: "vertical" },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.swiper-wrapper {
  height: 6.25rem;
}
.swiper-slide1 {
  background: skyblue;
}
.swiper-slide2 {
  background: yellowgreen;
}
.swiper-slide3 {
  background: blanchedalmond;
}
</style>
