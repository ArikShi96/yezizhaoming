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
          @onClick="loginByWechat"
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
      loading: false,
    };
  },
  mounted() {
    let code = this.getUrlCode("code");
    if (code) {
      this.getOpenidAndUserinfo(code);
    }
  },
  methods: {
    // 微信登录
    async loginByWechat() {
      try {
        this.loading = true;
        const res = await AUTH_API.quickLogin({});
        store.setUserInfo(res.data || {});
        if (res.has_bind_mobile) {
          this.navigateHome();
        } else {
          this.$router.push({ path: "/login/bind-phone" });
        }
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    // 跳到手机号登录
    loginByPhone() {
      this.$router.push({ path: "/login/login-by-phone" });
    },
    // navigate 首页
    navigateHome() {
      this.$router.push({ path: "/" });
    },
    // 获取code
    // 先判断url中有没有code，如果有code，表明已经授权，如果没有code，跳转微信授权链接
    getCode() {
      if (this.isWechat()) {
        // 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
        let code = this.getUrlCode("code");
        if (!code) {
          window.location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            appid +
            "&redirect_uri=" +
            encodeURIComponent(
              "http://127.0.0.1/pages/views/profile/login/login"
            ) +
            "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
          // redirect_uri是授权成功后，跳转的url地址，微信会帮我们跳转到该链接，并且通过？的形式拼接code，这里需要用encodeURIComponent对链接进行处理。
          // 如果配置参数一一对应，那么此时已经通过回调地址刷新页面后，你就会再地址栏中看到code了。
          // http://127.0.0.1/pages/views/profile/login/login?code=001BWV4J1lRzz00H4J1J1vRE4J1BWV4q&state=1
        }
      }
    },
    getUrlCode(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || ["", ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    isWechat() {
      return true;
      // return (
      //   String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) ===
      //   "micromessenger"
      // );
    },
    async getOpenidAndUserinfo(code) {
      try {
        await AUTH_API.login({ code });
      } catch (err) {
        this.$alert(err.message);
      }
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
    margin: 1.625rem auto;
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
