<template>
  <v-dialog
    :visible="true"
    :showCloseIcon="!isIframe"
    @cancel="$emit('cancel')"
  >
    <div class="dialog-title">请选择一个场景</div>
    <div class="dialog-tip">(仅支持竖屏场景)</div>
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
        <div v-if="!isIframe" class="image-type" @click="handleTypeClick(1)">
          模板选择
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script>
import store from "@/utils/store.js";
import { UPLOAD_API } from "@/utils/api.js";
import * as util from "@/utils/util.js";
export default {
  data() {
    return {
      loading: false,
      isIframe: util.isIframe(),
    };
  },
  methods: {
    handleTypeClick(type) {
      this.$emit("confirm", type);
    },
    async handleFileChange(file) {
      this.loading = true;
      const type = 2;
      let handledFile = null;
      if (!util.isiOS()) {
        try {
          handledFile = await this.removePicExif(file.raw);
        } catch (err) {
          handledFile = null;
        }
      }
      const res = await UPLOAD_API({
        upload_file: handledFile || file.raw,
      });
      this.loading = false;
      store.setBackgroundImage({ type, url: res.data.url });
      this.$emit("confirm", type);
    },
    removePicExif(file) {
      return new Promise((reslove) => {
        if (file) {
          let reader = new FileReader();
          let image = new Image();
          reader.onload = function (ev) {
            image.src = ev.target.result;
            image.onload = function () {
              const ctxWidth = this.width;
              const ctxHeight = this.height;
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              canvas.width = ctxWidth;
              canvas.height = ctxHeight;
              ctx.drawImage(this, 0, 0, ctxWidth, ctxHeight);
              canvas.toBlob((blob) => {
                const newFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                reslove(newFile);
              });
            };
          };
          reader.readAsDataURL(file);
        }
      });
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
.dialog-tip {
  opacity: 0.9;
  font-size: 0.75rem;
  font-family: PingFangSC, PingFangSC-Medium;
  text-align: center;
  color: #666666;
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
