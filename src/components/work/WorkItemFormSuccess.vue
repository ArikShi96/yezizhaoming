<template>
  <div class="work-form-success">
    <img class="logo" :src="LogoPng" alt="" />
    <div class="tip">
      您的申请已经提交，客服会在2-3日发送到您的邮箱，请耐心等待…
    </div>
    <v-button
      class="confirm-button"
      text="确定"
      type="primary"
      @onClick="navigateWorkList"
    ></v-button>
    <div class="href-message">（{{ countDownNum }})秒后自动跳转我的作品</div>
  </div>
</template>
<script>
import LogoPng from "@/assets/image/common/logo.png";
export default {
  data() {
    return {
      LogoPng,
      countDownNum: 5,
    };
  },
  methods: {
    countDown() {
      this.countDownNum = 5;
      let timer = setInterval(() => {
        if (this.countDownNum === 0) {
          clearInterval(timer);
          this.navigateWorkList();
        } else {
          this.countDownNum--;
        }
      }, 1000);
    },
    navigateWorkList() {
      this.$router.push({ name: "WorkList" });
    },
  },
};
</script>
<style lang="scss" scoped>
.work-form-success {
  padding-top: 2rem;
  text-align: center;
  .logo {
    width: 8.375rem;
    height: 6.25rem;
    margin-bottom: 1rem;
  }
  .tip {
    width: 12.5rem;
    font-size: 0.75rem;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #333330;
    margin: auto;
  }
  /deep/ .confirm-button {
    width: 12.5rem;
    height: 2.5rem;
    margin: 5rem auto 2.25rem;
  }
  .href-message {
    font-size: 0.75rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #666666;
  }
}
</style>
