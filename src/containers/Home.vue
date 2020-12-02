<template>
  <div class="home-page">
    <swiper
      v-if="swipers.length > 0"
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
        <img class="swiper-image" :src="swiper.img" alt="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
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
import { HOME_API } from "@/utils/api.js";
import "swiper/dist/css/swiper.css";
// import SwiperOption from "@/utils/swiperOption.js";
import store from "@/utils/store.js";
export default {
  data() {
    return {
      swiperOption: {
        //自动轮播
        autoplay: {
          delay: 3000,
        },
        speed: 500,
        //开启循环模式
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "my-bullet",
          bulletActiveClass: "my-bullet-active",
          clickable: true,
        },
      },
      swipers: [],
      loading: false,
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiperList.swiper;
    },
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
      store.clearAll();
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
/deep/ .swiper-pagination-bullets {
  bottom: 95% !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
/deep/.swiper-pagination .my-bullet {
  width: 0.75rem;
  height: 0.75rem;
  display: inline-block;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  margin-right: 0.5rem;
}
/deep/.swiper-pagination .my-bullet-active {
  width: 0.75rem;
  height: 0.75rem;
  background: rgba(255, 255, 255, 1);
}
</style>
