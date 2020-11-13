<template>
  <el-tabs
    v-if="visible"
    class="system-image-list"
    v-model="activeName"
    @tab-click="handleClick"
  >
    <el-tab-pane
      v-for="tab in imageTabs"
      :key="tab.tab"
      :label="tab.tab"
      :name="tab.tab"
    >
      <div class="image-list">
        <img
          v-for="(image, index) in tab.images"
          :key="index"
          class="image-item"
          :src="image"
          @click="viewImage(image)"
        />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import BgImg from "@/assets/image/test/bg.jpg";
import BgImg2 from "@/assets/image/test/bg2.png";
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      imageTabs: [],
      activeName: "",
      loading: false,
    };
  },
  watch: {
    visible() {
      if (this.visible && !this.imageTabs.length) {
        this.fetchImageList();
      }
    },
  },
  methods: {
    async fetchImageList() {
      this.loading = true;
      this.imageTabs = [
        { tab: "分类1", images: [BgImg, BgImg2, BgImg, BgImg2, BgImg, BgImg2] },
        { tab: "分类2", images: [BgImg, BgImg2, BgImg, BgImg2] },
      ];
      this.activeName = this.imageTabs.length ? this.imageTabs[0].tab : "";
      this.loading = false;
    },
    handleClick() {},
    viewImage(image) {
      this.$emit("confirm", image);
    },
  },
};
</script>
<style lang="scss" scoped>
.system-image-list {
  .image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .image-item {
      width: 49.8%;
      height: 18rem;
      object-fit: cover;
      margin-bottom: 0.125rem;
    }
  }
}
</style>
