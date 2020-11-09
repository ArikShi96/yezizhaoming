<template>
  <div class="home-page">
    <swiper id="swiperBox" :options="swiperOption" ref="swiper">
      <swiper-slide
        v-for="(swiper, index) in swipers"
        :key="index"
        class="swiper-slide"
      >
        <img class="swiper-image" :src="swiper" alt="" />
      </swiper-slide>
    </swiper>
    <div class="home-links">
      <v-button
        text="我要创作"
        type="primary"
        @onClick="navigateCreate"
      ></v-button>
      <v-button
        text="我的作品"
        type="primary"
        @onClick="navigateWorkList"
      ></v-button>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import SwiperOption from "@/utils/swiperOption.js";
import BgImg from "@/assets/image/test/bg.jpg";
import BgImg2 from "@/assets/image/test/bg2.png";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      BgImg,
      BgImg2,
      swiperOption: { ...SwiperOption },
      swipers: [],
    };
  },
  mounted() {
    this.fetchSwiperList();
  },
  methods: {
    // 获取轮播图
    async fetchSwiperList() {
      this.swipers = [BgImg, BgImg2];
    },
    // 跳转
    navigateCreate() {
      this.$router.push({ path: "/create" });
    },
    navigateWorkList() {
      this.$router.push({ name: "WorkList" });
    },
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  position: relative;
  height: 100%;
  width: 100%;
  .home-links {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 1.75rem;
    z-index: 10;
    /deep/ .custom-button {
      width: 7.5rem;
      margin: 0 1rem;
    }
  }
  /deep/ .swiper-wrapper {
    height: 100vh !important;
  }
  .swiper-image {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
}
</style>
