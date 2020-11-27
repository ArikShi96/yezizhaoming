<template>
  <div class="system-image-preview-page" v-loading="loading">
    <img class="back-icon" :src="BackIcon" alt="" @click="backList" />
    <div v-if="showWizard" class="shadow-wizard" @click="hideWizard">
      <img class="wizard-img" :src="WizardImg" alt="" />
    </div>
    <image-swiper
      :visible="visible"
      ref="swiper"
      class="preview-image"
      :imagesList="imagesList"
      @change-row="changeRow"
      @change-col="changeCol"
    />
    <div class="next-step">
      <v-button text="立即使用" type="primary" @onClick="confirm"></v-button>
    </div>
  </div>
</template>
<script>
import ImageSwiper from "@/components/ImageSwiper/index.vue";
import WizardImg from "@/assets/image/common/slide.png";
import BackIcon from "@/assets/image/common/back.png";
import store from "@/utils/store.js";
import { HOME_API } from "@/utils/api.js";
export default {
  components: {
    ImageSwiper,
  },
  data() {
    return {
      visible: false,
      showWizard: false,
      loading: false,
      WizardImg,
      BackIcon,
      imagesList: [{ images: [] }],
      row: 0,
      col: 0,
    };
  },
  mounted() {
    this.showWizard = store.getIsNewComer() === "true";
    this.fetchImagesList();
  },
  methods: {
    hideWizard() {
      store.setIsNewComer(false);
      this.showWizard = false;
    },
    async fetchImagesList() {
      this.loading = true;
      try {
        const res = await HOME_API.storeCategories();
        const categories = res.data || [];
        const responses = await Promise.all(
          categories.map((category) => {
            return HOME_API.storeImages({
              category_id: category.id,
              page: 1,
              pagesize: 100,
            });
          })
        );
        const imagesList = [];
        responses.forEach((res) => {
          if (res.data && res.data.length > 0) {
            imagesList.push({
              category_id: res.data[0].category_id,
              images: res.data,
            });
          }
        });
        this.imagesList = imagesList;
        this.visible = true;
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    backList() {
      this.$router.go(-1);
    },
    changeRow(row) {
      this.row = row;
    },
    changeCol(col) {
      this.col = col;
    },
    confirm() {
      const cols = this.imagesList[this.row].images;
      const currentItem = cols[this.col]; // TODO
      store.setBackgroundImage({ type: 0, ...currentItem });
      if (this.$route.query.reselect) {
        this.$router.push({ path: "/create/work" });
      } else {
        this.$router.push({ path: "/create/name-input" });
      }
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
