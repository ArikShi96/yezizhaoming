<template>
  <div class="image-swiper">
    <transition name="fade">
      <swiper id="swiperBox" :options="swiperOption" ref="swiperList">
        <swiper-slide v-for="(item, index) in imagesList" :key="index">
          <swiper-list
            :visible="visible && subVisible"
            :images="item.images"
            :category_id="item.category_id"
            @change-col="changeCol"
          ></swiper-list>
        </swiper-slide>
      </swiper>
    </transition>
  </div>
</template>
<script>
// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import SwiperList from "./SwiperList";
import SwiperOption from "@/utils/swiperOption.js";
export default {
  components: {
    // Swiper,
    // SwiperSlide,
    SwiperList,
  },
  props: {
    imagesList: {
      type: Array,
    },
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      subVisible: false,
      swiperOption: {
        ...SwiperOption,
        on: {
          slideChange: () => {
            this.$emit("change-row", this.swiper.activeIndex);
          },
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiperList.swiper;
    },
  },
  watch: {
    visible() {
      if (this.visible) {
        const categoryId = this.$route.query.category_id;
        let currentSlideIndex = 0;
        this.imagesList.forEach((images, index) => {
          if (images.category_id + "" === categoryId) {
            currentSlideIndex = index;
          }
        });
        this.$nextTick(() => {
          this.swiper.slideTo(currentSlideIndex, 0);
          this.subVisible = true;
        });
      }
    },
  },
  methods: {
    changeCol(col) {
      this.$emit("change-col", col);
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
#swiperBox {
  height: 100%;
}
/deep/ .swiper-wrapper {
  height: calc(100vh - 4.5rem) !important;
}
</style>
