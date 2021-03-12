<template>
  <v-dialog
    class="share-dialog"
    :visible="true"
    :showCloseIcon="true"
    @cancel="$emit('cancel')"
  >
    <div v-loading="loading" class="preview-wrap">
      <img
        v-if="!previewImageUrl"
        class="preview-img"
        :src="(detailItem || {}).url"
        alt=""
      />
      <div v-if="!previewImageUrl" class="logo-wrap">
        <img class="logo" :src="LogoPng" alt="" />
        <div class="devide"></div>
        <div class="slogan">定制家，定制光</div>
      </div>
      <img
        v-if="previewImageUrl"
        class="preview-img"
        :class="{ 'height-auto': !!previewImageUrl }"
        :src="previewImageUrl"
        alt=""
      />
    </div>
    <div class="action-wrap">
      <!-- <div class="action" @click="download">
        <img class="action-icon" :src="DownloadIcon" alt="" />
        <span>下载到本地</span>
      </div>
      <div class="action" @click="shareFriend">
        <img class="action-icon" :src="WechatIcon" alt="" />
        <span>分享至好友</span>
      </div>
      <div class="action" @click="shareTimeline">
        <img class="action-icon" :src="FriendIcon" alt="" />
        <span>分享至朋友圈</span>
      </div> -->
      <v-button text="长按图片保存到本地" type="primary" />
    </div>
  </v-dialog>
</template>
<script>
import LogoPng from "@/assets/image/common/logo2.png";
import DownloadIcon from "@/assets/image/common/share/download.png";
import WechatIcon from "@/assets/image/common/share/wechat.png";
import FriendIcon from "@/assets/image/common/share/friend.png";
import * as util from "@/utils/util.js";
import domtoimage from "dom-to-image";
import { UPLOAD_API } from "@/utils/api.js";
import html2canvas from "html2canvas";
const appid = "wxa035284c42ea6b97";
export default {
  props: {
    detailItem: {
      type: Object,
    },
  },
  data() {
    return {
      appid,
      LogoPng,
      DownloadIcon,
      WechatIcon,
      FriendIcon,
      loading: false,
      previewImageUrl: "",
      isImageReady: false,
    };
  },
  mounted() {
    window.wx.ready(() => {
      window.wx.updateAppMessageShareData({
        title: `${this.detailItem.title}`, // 分享标题
        desc: "分享作品", // 分享描述
        link: `${window.location.host}/work-detail/${this.detailItem.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${this.detailItem.url}`, // 分享图标
        success: function () {
          // 设置成功
        },
      });
      window.wx.updateTimelineShareData({
        title: `${this.detailItem.title}`, // 分享标题
        link: `${window.location.host}/work-detail/${this.detailItem.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: `${this.detailItem.url}`, // 分享图标
        success: function () {
          // 设置成功
        },
      });
    });
    document.querySelector(".preview-img").onload = () => {
      this.isImageReady = true;
    };
  },
  watch: {
    isImageReady() {
      if (this.isImageReady) {
        window.setTimeout(() => {
          try {
            this.generatePreviewImage();
          } catch (err) {
            this.loading = false;
            this.previewImageUrl = "";
          }
        }, 500);
      }
    },
  },
  methods: {
    shareFriend() {},
    shareTimeline() {},
    download() {
      // window.location.href((this.detailItem || {}).url);
      // 创建a标签 并设置其相关属性，最后触发其点击事件

      let a = document.createElement("a");

      let clickEvent = document.createEvent("MouseEvents");

      a.setAttribute("href", this.detailItem.url);

      a.setAttribute("download", "codeImg");

      a.setAttribute("target", "_blank");

      clickEvent.initEvent("click", true, true);

      a.dispatchEvent(clickEvent);
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // 生成带logo的preview image
    async generatePreviewImage() {
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      let url = "";
      if (util.isiOS()) {
        url = await domtoimage.toPng(
          document.getElementsByClassName("preview-wrap")[0]
        );
        url = await domtoimage.toPng(
          document.getElementsByClassName("preview-wrap")[0]
        );
      } else {
        url = await domtoimage.toSvg(
          document.getElementsByClassName("preview-wrap")[0]
        );
        url = await domtoimage.toSvg(
          document.getElementsByClassName("preview-wrap")[0]
        );
        const rect = document
          .getElementsByClassName("preview-wrap")[0]
          .getBoundingClientRect();
        url = await util.toUnionImage(url, [0, 0, rect.width, rect.height]);
      }
      this.loading = true;
      const res = await UPLOAD_API({
        upload_file: this.dataURLtoFile(url, "预览.png"),
      });
      this.loading = false;
      this.previewImageUrl = res.data.url;
    },
    // 生成带logo的preview image
    async generatePreviewImage2() {
      this.loading = true;
      const canvas = await html2canvas(
        document.getElementsByClassName("preview-wrap")[0],
        {
          scale: 2,
          allowTaint: false, //允许污染
          useCORS: true, //使用跨域(当allowTaint为true时这段代码没什么用,下面解释)
        }
      );
      const url = canvas.toDataURL("image/jpeg", 1);
      this.previewImageUrl = url;
      // const res = await UPLOAD_API({
      //   upload_file: this.dataURLtoFile(url, "预览.png"),
      // });
      // this.previewImageUrl = res.data.url;
      this.loading = false;
    },
    // 生成带logo的preview image
    async generatePreviewImage3() {
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      let url = "";
      url = await domtoimage.toSvg(
        document.getElementsByClassName("preview-wrap")[0]
      );
      // this.previewImageUrl = url;
      const rect = document
        .getElementsByClassName("preview-wrap")[0]
        .getBoundingClientRect();
      url = await util.toUnionImage(url, [0, 0, rect.width, rect.height]);
      this.loading = true;
      const res = await UPLOAD_API({
        upload_file: this.dataURLtoFile(url, "预览.png"),
      });
      this.loading = false;
      this.previewImageUrl = res.data.url;
    },
  },
};
</script>
<style lang="scss" scoped>
.share-dialog /deep/ .dialog-modal {
  border-radius: 0;
  padding: 1rem;
}
.preview-wrap {
  background: #ffffff;
  border-radius: 0.25rem;
  box-shadow: 0rem 0rem 0.375rem 0rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  .preview-img {
    width: 16.2rem;
    height: 22.8rem;
    margin-bottom: 1rem;
    object-fit: cover;
    &.height-auto {
      height: auto;
      margin-bottom: 0;
    }
  }
  .logo-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      width: 2.8125rem;
      height: 1.25rem;
    }
    .devide {
      width: 0.0625rem;
      height: 0.5625rem;
      background-color: #d5d5d5;
      margin: 0 0.375rem;
    }
    .slogan {
      font-size: 0.875rem;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #231816;
      line-height: 1.25rem;
    }
  }
}
.action-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33.3333%;
    font-size: 0.75rem;
    font-family: PingFangSC, PingFangSC-Medium;
    color: #333333;
    line-height: 1.0625rem;
    .action-icon {
      margin-bottom: 0.25rem;
      width: 1.875rem;
      height: 1.875rem;
    }
  }
}
</style>
