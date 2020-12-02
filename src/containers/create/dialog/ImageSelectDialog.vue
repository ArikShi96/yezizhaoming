<template>
  <v-dialog :visible="true" :showCloseIcon="true" @cancel="$emit('cancel')">
    <div class="dialog-title">请选择一个场景</div>
    <div v-loading="loading" class="dialog-content">
      <div class="image-type-list">
        <el-upload
          ref="upload"
          accept="image/*"
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
import { UPLOAD_API } from "@/utils/api.js";
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleTypeClick(type) {
      this.$emit("confirm", type);
    },
    async handleFileChange(file) {
      this.loading = true;
      const type = 2;
      const res = await UPLOAD_API({
        upload_file: file.raw,
      });
      this.loading = false;
      store.setBackgroundImage({ type, url: res.data.url });
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
