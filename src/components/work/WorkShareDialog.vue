<template>
  <v-dialog
    class="share-dialog"
    :visible="true"
    :showCloseIcon="true"
    @cancel="$emit('cancel')"
  >
    <div class="preview-wrap">
      <img class="preview-img" :src="(detailItem || {}).url" alt="" />
      <div class="logo-wrap">
        <img class="logo" :src="LogoPng" alt="" />
        <div class="devide"></div>
        <div class="slogan">定制家，定制光</div>
      </div>
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
const appid = "wxa035284c42ea6b97";
// import { AUTH_API } from "@/utils/api.js";
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
