<template>
  <v-dialog :visible="visible" :showCloseIcon="true" @cancel="$emit('cancel')">
    <div class="dialog-title">请选择一个场景</div>
    <div class="dialog-content">
      <div class="image-type-list">
        <div class="image-type" @click="handleTypeClick(0)">拍摄照片</div>
        <div class="image-type" @click="handleTypeClick(1)">从相册选择</div>
        <div class="image-type" @click="handleTypeClick(2)">系统图库</div>
        <div class="image-type" @click="handleTypeClick(3)">模板选择</div>
      </div>
    </div>
  </v-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  methods: {
    handleTypeClick(type) {
      this.$emit("on-type-click", type);
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-title {
  opacity: 0.9;
  font-size: 1.0625rem;
  font-family: PingFangSC, PingFangSC-Medium;
  text-align: center;
  color: #000000;
}
.dialog-content {
  text-align: center;
  .image-type {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12.75rem;
    height: 2.5rem;
    background: #e6eece;
    border: 0.0625rem solid #99c901;
    border-radius: 1.25rem;
    font-size: 0.875rem;
    font-family: PingFangSC, PingFangSC-Medium;
    color: #99c901;
    &:focus,
    &:active {
      border: none;
      background: #99c901;
      color: #ffffff;
    }
    margin-top: 1.25rem;
  }
}
</style>
