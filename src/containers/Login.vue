<template>
  <div class="login-page">
    <div v-if="isFirstStep" class="first-step">
      <div class="logo-wrap">
        <img src="../assets/image/common/logo.png" alt="" />
      </div>
      <div class="title">叶子照明</div>
      <div class="message">申请获取你的微信绑定账号</div>
      <div class="button-wrap">
        <v-button text="微信登录" type="primary" @onClick="loginByWechat" />
      </div>
      <div class="login-by-phone" @click="loginByPhone">使用手机号登录</div>
    </div>
    <div v-else class="second-step">
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
          @onClick="isLoginMode ? login() : bindPhone()"
        />
      </div>
      <div v-if="isLoginMode" class="message">未注册的用户登录成功及为注册</div>
      <div class="accept-wrap">
        <span v-if="accept" class="circle accept" @click="accept = !accept"
          ><i class="el-icon-check"></i
        ></span>
        <span v-else class="circle" @click="accept = !accept"></span>
        <span>同意</span>
        <a href="https://www.baidu.com/" target="_blank">《叶子照明》</a>
        <span>用户协议</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFirstStep: true,
      isLoginMode: false,
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
    // 微信登录
    loginByWechat() {
      this.isFirstStep = false;
      this.isLoginMode = false;
    },
    // 跳到手机号登录
    loginByPhone() {
      this.isFirstStep = false;
      this.isLoginMode = true;
    },

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
    getVerifyCode() {
      if (this.validatePhone(this.formData.phone)) {
        this.validateBtn();
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
    login() {
      if (
        this.validatePhone(this.formData.phone) &&
        this.validateCode(this.formData.passCode)
      ) {
        //
        this.navigateHome();
      }
    },
    // 绑定手机号
    bindPhone() {
      if (
        this.validatePhone(this.formData.phone) &&
        this.validateCode(this.formData.passCode)
      ) {
        //
        this.navigateHome();
      }
    },
    // navigate 首页
    navigateHome() {
      this.$router.push({ path: "/" });
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
    bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    font-family: PingFang, PingFang-SC;
    color: #999999;
    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.625rem;
      border-radius: 100%;
      font-weight: bold;
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      background: #ffffff;
      border: 0.0625rem solid #d4d4d4;
      &.accept {
        border: none;
        background: #99c901;
        color: #ffffff;
      }
    }
    a {
      color: #99c901;
    }
  }
}
</style>
