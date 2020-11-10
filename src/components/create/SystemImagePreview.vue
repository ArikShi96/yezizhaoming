<template>
  <div v-if="visible" class="system-image-preview">
    <div v-if="showWizard" class="shadow-wizard"></div>
    <image-swiper class="preview-image" :imagesList="imagesList" />
    <div class="next-step">
      <v-button text="立即使用" type="primary"></v-button>
    </div>
  </div>
</template>
<script>
import ImageSwiper from "@/components/ImageSwiper/index.vue";
import BgImg from "@/assets/image/test/bg.jpg";
import BgImg2 from "@/assets/image/test/bg2.png";
export default {
  components: {
    ImageSwiper,
  },
  props: {
    visible: {
      type: Boolean,
    },
    showWizard: {
      type: Boolean,
    },
  },
  data() {
    return {
      BgImg,
      BgImg2,
      imagesList: [{ images: [] }],
    };
  },
  mounted() {
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
  },
};
</script>
<style lang="scss" scoped>
.system-image-preview {
  height: 100vh;
  padding: 0.75rem 0.875rem;
  position: relative;
  .shadow-wizard {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vh;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 10;
    pointer-events: none;
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
