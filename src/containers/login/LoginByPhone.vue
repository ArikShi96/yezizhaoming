<template>
  <div class="bind-page">
    <div class="second-step">
      <div class="title">{{ isLoginMode ? "登录" : "绑定手机号" }}</div>
      <el-form :model="formData" ref="form" class="form">
        <el-form-item label prop="phone">
          <el-input
            v-model="formData.phone"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="passCode">
          <el-input
            v-model="formData.passCode"
            autocomplete="off"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <div class="label phone">手机号</div>
        <div class="label code">验证码</div>
        <v-button
          type="primary"
          :text="passcodeBtn.btnTitle"
          :disabled="passcodeBtn.disabled"
          @onClick="getVerifyCode"
        />
      </el-form>
      <div class="login-button">
        <v-button
          type="primary"
          :text="isLoginMode ? '快速登录' : '完成'"
          :loading="loading"
          @onClick="login"
        />
      </div>
      <div v-if="isLoginMode" class="message">未注册的用户登录成功及为注册</div>
      <div class="accept-wrap">
        <v-radio
          class="accept-radio"
          :checked="accept"
          @on-click="accept = !accept"
        />
        <span>同意</span>
        <a href="https://www.baidu.com/" target="_blank">《叶子照明》</a>
        <span>用户协议</span>
      </div>
    </div>
  </div>
</template>
<script>
import { AUTH_API } from "@/utils/api.js";
import store from "@/utils/store.js";
export default {
  data() {
    return {
      isLoginMode: true,
      accept: false, // 是否同意协议
      passcodeBtn: {
        // 获取验证码
        disabled: false,
        btnTitle: "获取验证码",
      },
      formData: {},
      loading: false,
    };
  },
  methods: {
    // 验证手机号
    validatePhone(value) {
      const phoneReg = /^1[345678]\d{9}$/;
      if (!this.formData.phone) {
        this.$alert("请输入手机号");
        return false;
      }
      if (!phoneReg.test(value)) {
        this.$alert("手机号格式不正确");
        return false;
      }
      return true;
    },
    // 验证验证码
    validateCode(code) {
      if (!code) {
        this.$alert("请输入验证码");
        return false;
      }
      return true;
    },
    // 获取验证码
    async getVerifyCode() {
      if (this.validatePhone(this.formData.phone)) {
        try {
          const res = await AUTH_API.code({
            access_token: "",
            mobile: this.formData.phone,
          });
          if (!res.success) {
            throw Error(res.message);
          }
          this.validateBtn();
        } catch (err) {
          this.$alert(err.message);
        }
      }
    },
    // 设置倒计时
    validateBtn() {
      //倒计时
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.passcodeBtn = {
            disabled: false,
            btnTitle: "重新发送",
          };
        } else {
          this.passcodeBtn = {
            disabled: true,
            btnTitle: `${time}秒后重试`,
          };
          time--;
        }
      }, 1000);
    },
    // 手机号登录
    async login() {
      if (
        this.validatePhone(this.formData.phone) &&
        this.validateCode(this.formData.passCode)
      ) {
        if (!this.accept) {
          this.$alert("请先同意用户协议");
          return;
        }
        this.loading = true;
        try {
          const res = await AUTH_API.login({
            code: this.formData.passCode,
            mobile: this.formData.phone,
          });
          store.setUserInfo(res.data || {});
          this.navigateHome();
        } catch (err) {
          this.$alert(err.message);
        }
        this.loading = false;
      }
    },
    // navigate 首页
    navigateHome() {
      store.setIsNewComer(true);
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style lang="scss" scoped>
.bind-page {
  height: 100%;
  width: 100%;
  min-height: 37.5rem;
}
.second-step {
  position: relative;
  padding: 3rem 1.5rem 2rem;
  height: 100%;
  .title {
    font-size: 1.5rem;
    font-family: PingFangSC, PingFangSC-Heavy;
    font-weight: 800;
    color: #333333;
    margin-bottom: 2.75rem;
  }
  .form {
    position: relative;
    .label {
      position: absolute;
      font-size: 1rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #4f4f4f;
      left: 1rem;
      &.phone {
        top: 0.75rem;
      }
      &.code {
        bottom: 0.85rem;
      }
    }
    /deep/ .el-input .el-input__inner {
      height: 3rem;
      border: 0.0625rem solid #e7e7e7;
      color: #4f4f4f;
      border-radius: 1.5rem;
      font-size: 1rem;
      padding-left: 4.5rem;
    }
    /deep/ .custom-button {
      font-family: PingFang, PingFang-SC;
      position: absolute;
      bottom: 0.75rem;
      right: 0.5rem;
      padding: 0.25rem;
      height: 1.5625rem;
      width: 5rem;
      border-radius: 0.8125rem;
      font-size: 0.75rem;
      &.disabled {
        pointer-events: none;
      }
    }
  }
  .login-button {
    margin-top: 4rem;
  }
  .message {
    margin-top: 1.25rem;
    font-size: 0.75rem;
    font-family: PingFang, PingFang-SC;
    text-align: center;
    color: #999999;
    line-height: 1.0625rem;
    letter-spacing: 0rem;
  }
  .accept-wrap {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    font-family: PingFang, PingFang-SC;
    color: #999999;
    .accept-radio {
      margin-right: 0.25rem;
    }
    a {
      color: #99c901;
    }
  }
}
</style>
