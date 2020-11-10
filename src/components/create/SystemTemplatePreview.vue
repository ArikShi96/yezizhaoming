<template>
  <div v-if="visible" class="system-template-preview">
    <img class="preview-image" :src="BgImg" alt="" />
    <div class="preview-actions">
      <div class="preview-action">重新选择</div>
      <div class="preview-action">立即使用</div>
    </div>
  </div>
</template>
<script>
import BgImg from "@/assets/image/test/bg.jpg";
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      BgImg,
    };
  },
};
</script>
<style lang="scss" scoped>
.system-template-preview {
  height: 100vh;
  position: relative;
  .preview-image {
    width: 100%;
    height: calc(100% - 2.25rem);
    object-fit: cover;
  }
  .preview-actions {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-family: PingFangSC, PingFangSC-Heavy;
    font-weight: 800;
    color: #99c901;
  }
}
</style>
