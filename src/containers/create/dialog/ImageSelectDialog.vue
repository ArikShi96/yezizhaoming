<template>
  <v-dialog :visible="true" :showCloseIcon="true" @cancel="$emit('cancel')">
    <div class="dialog-title">请选择一个场景</div>
    <div class="dialog-content">
      <div class="image-type-list">
        <el-upload
          ref="upload"
          :on-change="handleFileChange"
          :limit="1"
          :auto-upload="false"
          :show-file-list="false"
          :action="''"
        >
          <div class="image-type">拍摄照片/从相册选择</div>
        </el-upload>
        <div class="image-type" @click="handleTypeClick(0)">系统图库</div>
        <div class="image-type" @click="handleTypeClick(1)">模板选择</div>
      </div>
    </div>
  </v-dialog>
</template>
<script>
import store from "@/utils/store.js";
export default {
  methods: {
    handleTypeClick(type) {
      this.$emit("confirm", type);
    },
    async handleFileChange(file) {
      // TODO
      const type = 2;
      store.setBackgroundImage({ type, file: file.name, id: "" });
      this.$emit("confirm", type);
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
