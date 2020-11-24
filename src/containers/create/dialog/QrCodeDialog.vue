<template>
  <v-dialog :visible="visible" :showCloseIcon="true" @cancel="$emit('cancel')">
    <div class="dialog-title">温馨提示</div>
    <div class="dialog-tip">
      请关注“leaves叶子照明设计”公众号，以便查看个人作品订单，第一时间了解新资讯。
    </div>
    <div class="dialog-content">
      <img class="qr-code" :src="QrCodeImage" alt="" />
      <v-button text="长按二维码关注公众号" type="primary" />
    </div>
  </v-dialog>
</template>
<script>
import QrCodeImage from "@/assets/image/common/qrCode.png";
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      QrCodeImage,
    };
  },
  methods: {},
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
  margin: 0.625rem auto;
  font-size: 0.875rem;
  font-family: PingFangSC, PingFangSC-Regular;
  text-align: center;
  color: #333333;
  line-height: 1.5rem;
}
.dialog-content {
  text-align: center;
  .qr-code {
    width: 8.75rem;
    height: 8.75rem;
    margin-bottom: 1.25rem;
  }
  /deep/ .custom-button {
    width: 10rem;
    height: 2.5rem;
    font-size: 0.875rem;
    font-family: PingFangSC, PingFangSC-Medium;
    color: #ffffff;
    margin: auto;
  }
}
</style>
