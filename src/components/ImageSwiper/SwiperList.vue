<template>
  <div class="image-swiper-col">
    <transition name="fade">
      <swiper :options="swiperOption" ref="swiper">
        <swiper-slide v-for="(image, index) in images" :key="index">
          <img class="image-swiper" :src="image.url" alt="" />
        </swiper-slide>
      </swiper>
    </transition>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import SwiperOption from "@/utils/swiperOption.js";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    images: {
      type: Array,
    },
    category_id: {},
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      swiperOption: {
        ...SwiperOption,
        direction: "vertical",
        on: {
          slideChange: () => {
            this.$emit("change-col", this.swiper.activeIndex);
          },
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper;
    },
  },
  watch: {
    visible() {
      if (this.visible && this.$route.query.category_id === this.category_id) {
        const imageId = this.$route.params.id;
        let currentSlideIndex = 0;
        this.images.forEach((image, index) => {
          if (image.id + "" === imageId) {
            currentSlideIndex = index;
          }
        });
        this.$nextTick(() => {
          this.swiper.slideTo(currentSlideIndex, 0);
        });
      }
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
.image-swiper {
  width: 100%;
  height: calc(100vh - 4.5rem) !important;
  object-fit: cover;
}
</style>
