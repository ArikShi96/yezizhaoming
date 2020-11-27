<template>
  <div class="login-page">
    <div class="first-step">
      <div class="logo-wrap">
        <img src="../assets/image/common/logo.png" alt="" />
      </div>
      <div class="title">叶子照明</div>
      <div class="message">申请获取你的微信绑定账号</div>
      <div class="button-wrap">
        <v-button
          text="微信登录"
          type="primary"
          :loading="loading"
          @onClick="callWxOauth"
        />
      </div>
      <div class="login-by-phone" :loading="loading" @click="loginByPhone">
        使用手机号登录
      </div>
    </div>
  </div>
</template>
<script>
import { AUTH_API } from "@/utils/api.js";
import store from "@/utils/store.js";
const appid = "wxa035284c42ea6b97";
export default {
  data() {
    return {
      appid,
      loading: false,
    };
  },
  mounted() {
    const openid = this.getUrlPara("openid");
    if (openid) {
      this.loginByWechat(openid);
    }
  },
  methods: {
    // 跳到手机号登录
    loginByPhone() {
      this.$router.push({ path: "/login/login-by-phone" });
    },
    // navigate 首页
    navigateHome() {
      store.setIsNewComer(true);
      this.$router.push({ path: "/" });
    },
    // 微信登录
    callWxOauth() {
      // window.location.href = `/oauth/wxOauth?${window.encodeURIComponent(
      //   window.location.href
      // )}`;
      window.location.href = `/oauth/wxOauth?redirect_url=${window.location.href}`;
    },
    async loginByWechat(openid) {
      try {
        this.loading = true;
        const res = await AUTH_API.quickLogin({ openid });
        store.setUserInfo(res.data || {});
        if (res.data.has_bind_mobile) {
          this.$alert("登录成功");
          this.navigateHome();
        } else {
          this.$alert("请先绑定手机号");
          this.$router.push({ path: "/login/bind-phone" });
        }
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    getUrlPara(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || ["", ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.login-page {
  height: 100%;
  width: 100%;
}
.first-step {
  height: 100%;
  .logo-wrap {
    padding: 1.625rem;
    margin: auto;
    text-align: center;
    img {
      height: 6.25rem;
      widows: 8.375rem;
    }
  }
  .title {
    font-family: PingFang, PingFang-SC;
    font-size: 1.375rem;
    text-align: center;
    color: #222222;
    margin-bottom: 1rem;
  }
  .message {
    font-family: PingFangSC, PingFangSC-Regular;
    font-size: 0.875rem;
    text-align: center;
    color: #444444;
  }
  .button-wrap {
    margin: 2.5rem 0 0.75rem;
    padding: 0 3.125rem;
    /deep/ .custom-button {
      height: 2.875rem;
      font-size: 1.125rem;
      font-family: PingFang, PingFang-SC;
    }
  }
  .login-by-phone {
    font-family: PingFangSC, PingFangSC-Regular;
    font-size: 0.875rem;
    text-align: center;
    color: #777777;
  }
}
</style>
