<template>
  <div class="system-image-preview-page">
    <img class="back-icon" :src="BackIcon" alt="" @click="backList" />
    <div v-if="showWizard" class="shadow-wizard">
      <img class="wizard-img" :src="WizardImg" alt="" />
    </div>
    <image-swiper ref="swiper" class="preview-image" :imagesList="imagesList" />
    <div class="next-step">
      <v-button text="立即使用" type="primary" @onClick="confirm"></v-button>
    </div>
  </div>
</template>
<script>
import ImageSwiper from "@/components/ImageSwiper/index.vue";
import WizardImg from "@/assets/image/common/slide.png";
import BackIcon from "@/assets/image/common/back.png";
import BgImg from "@/assets/image/test/bg.jpg";
import BgImg2 from "@/assets/image/test/bg2.png";
import store from "@/utils/store.js";
// import { HOME_API } from "@/utils/api.js";
export default {
  components: {
    ImageSwiper,
  },
  data() {
    return {
      showWizard: false,
      loading: false,
      WizardImg,
      BackIcon,
      BgImg,
      BgImg2,
      imagesList: [{ images: [] }],
    };
  },
  mounted() {
    this.showWizard = store.getIsNewComer() === "true";
    this.fetchImagesList();
  },
  methods: {
    async fetchImagesList() {
      this.imagesList = [
        { images: [BgImg, BgImg2] },
        { images: [BgImg, BgImg2] },
        { images: [BgImg, BgImg2] },
      ];
    },
    backList() {
      this.$router.go(-1);
    },
    confirm() {
      this.$router.push({ path: "/create/name-input" });
    },
  },
};
</script>
<style lang="scss" scoped>
.system-image-preview-page {
  height: 100vh;
  padding: 0.75rem 0.875rem;
  position: relative;
  .back-icon {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 1.625rem;
    height: 1.625rem;
    z-index: 9;
  }
  .shadow-wizard {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vh;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 10;
    pointer-events: none;
    .wizard-img {
      width: 9.375rem;
      height: auto;
      position: absolute;
      top: 8.25rem;
      left: 7rem;
    }
  }
  .next-step {
    width: 100%;
    position: fixed;
    bottom: 0.625rem;
    left: 0;
    /deep/ .custom-button {
      width: 12.5rem;
      height: 2.5rem;
      margin: auto;
    }
  }
}
</style>
