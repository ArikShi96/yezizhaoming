<template>
  <div class="image-select-page">
    <image-select-dialog
      @cancel="handleCancel"
      @confirm="handleConfirm"
    ></image-select-dialog>
  </div>
</template>
<script>
import ImageSelectDialog from "@/containers/create/dialog/ImageSelectDialog.vue";
export default {
  components: {
    ImageSelectDialog,
  },
  methods: {
    handleConfirm(type) {
      this.selectBackgroundImage(type);
    },
    handleCancel() {
      this.$router.push({ path: "/" });
    },
    // 选择背景图片
    selectBackgroundImage(type) {
      switch (type) {
        case 0: {
          this.$router.push({ path: "/create/system-images" });
          break;
        }
        case 1: {
          this.$router.push({ path: "/create/system-templates" });
          break;
        }
        case 2: {
          this.$router.push({ path: "/create/name-input" });
          break;
        }
        default: {
          break;
        }
      }
    },
    // 重新选择背景图片
    reselectBackgroundImage(type) {
      switch (type) {
        case 0: {
          this.$router.push({ path: "/create/name-input" });
          break;
        }
        case 1: {
          this.$router.push({ path: "/create/system-images" });
          break;
        }
        case 2: {
          this.$router.push({ path: "/create/system-templates" });
          break;
        }
        default: {
          break;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.image-select-page {
  height: 100vh;
}
</style>
