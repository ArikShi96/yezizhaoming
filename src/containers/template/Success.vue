<template>
  <div class="work-form-success">
    <img class="logo" :src="LogoPng" alt="" />
    <div class="tip">您的模板已经成功创建</div>
    <v-button
      class="confirm-button"
      text="继续创建"
      type="primary"
      @onClick="navigateCreateTemplate"
    ></v-button>
  </div>
</template>
<script>
import LogoPng from "@/assets/image/common/logo.png";
import store from "@/utils/store.js";
export default {
  data() {
    return {
      LogoPng,
    };
  },
  methods: {
    navigateCreateTemplate() {
      store.clearAll();
      this.$router.push({ path: "/template" });
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
