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
      if (this.$route.path === "/create/work/change-bg") {
        this.reselectBackgroundImage(type);
      } else {
        this.selectBackgroundImage(type);
      }
    },
    handleCancel() {
      if (this.$route.path === "/create/work/change-bg") {
        this.$router.push({ path: "/create/work" });
      } else {
        this.$router.push({ path: "/" });
      }
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
          this.$router.push({ path: "/create/system-images&reselect=true" });
          break;
        }
        case 1: {
          this.$router.push({ path: "/create/system-templates&reselect=true" });
          break;
        }
        case 2: {
          this.$router.push({ path: "/create/work" });
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
