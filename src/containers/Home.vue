<template>
  <div class="home-page">
    <swiper
      id="swiperBox"
      :options="swiperOption"
      ref="swiper"
      v-loading="loading"
    >
      <swiper-slide
        v-for="(swiper, index) in swipers"
        :key="index"
        class="swiper-slide"
      >
        <img class="swiper-image" :src="`${HOST_NAME}/${swiper.img}`" alt="" />
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
import { HOME_API, HOST_NAME } from "@/utils/api.js";
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
      HOST_NAME,
      BgImg,
      BgImg2,
      swiperOption: { ...SwiperOption },
      swipers: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchSwiperList();
  },
  methods: {
    // 获取轮播图
    async fetchSwiperList() {
      this.loading = true;
      try {
        const res = await HOME_API.banners({});
        this.swipers = res.data || [];
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    // 跳转
    navigateCreate() {
      this.$router.push({ path: "/create/image-select" });
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
  height: 100vh;
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
