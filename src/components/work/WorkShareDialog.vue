<template>
  <v-dialog class="share-dialog" :visible="visible" :showCloseIcon="true">
    <div class="preview-wrap">
      <img class="preview-img" :src="BgPng" alt="" />
      <div class="logo-wrap">
        <img class="logo" :src="LogoPng" alt="" />
        <div class="devide"></div>
        <div class="slogan">定制家，定制光</div>
      </div>
    </div>
    <div class="action-wrap">
      <div class="action">
        <img class="action-icon" :src="DownloadIcon" alt="" />
        <span>下载到本地</span>
      </div>
      <div class="action">
        <img class="action-icon" :src="WechatIcon" alt="" />
        <span>分享至好友</span>
      </div>
      <div class="action">
        <img class="action-icon" :src="FriendIcon" alt="" />
        <span>分享至朋友圈</span>
      </div>
    </div>
  </v-dialog>
</template>
<script>
import LogoPng from "@/assets/image/common/logo2.png";
import BgPng from "@/assets/image/test/bg.jpg";
import DownloadIcon from "@/assets/image/common/share/download.png";
import WechatIcon from "@/assets/image/common/share/wechat.png";
import FriendIcon from "@/assets/image/common/share/friend.png";
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      LogoPng,
      BgPng,
      DownloadIcon,
      WechatIcon,
      FriendIcon,
    };
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
    width: 18rem;
    height: 25.375rem;
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
