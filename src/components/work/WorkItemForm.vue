<template>
  <div class="work-item-form">
    <div class="title">
      <img class="title-icon" :src="DocumentIcon" alt="" />
      <span>填写表单，免费获取3D图纸</span>
    </div>
    <div class="tip">
      申请会员并审核通过后，客服
      <br />
      会在2-3日发送到您的邮箱
      <br />
      为了保证您能尽快获取图纸，请如实填写。
    </div>
    <div class="input-wrap">
      <div class="label">
        <span class="required">*</span>
        <span>您的姓名</span>
      </div>
      <el-input v-model="formData.name" placeholder="如*先生/女士"></el-input>
    </div>
    <div class="input-wrap">
      <div class="label">
        <span class="required">*</span>
        <span>您的手机号</span>
      </div>
      <el-input
        v-model="formData.phone"
        placeholder="请填写您的手机号"
      ></el-input>
    </div>
    <div class="input-wrap">
      <div class="label">
        <span class="required">*</span>
        <span>您的邮箱</span>
      </div>
      <el-input
        v-model="formData.email"
        placeholder="请填写您的邮箱"
      ></el-input>
    </div>
    <div class="input-wrap">
      <div class="label">您的职业</div>
      <el-input v-model="formData.job" placeholder="请填写您的职业"></el-input>
    </div>
    <div class="input-wrap">
      <div class="label">您的地址</div>
      <el-input
        v-model="formData.address"
        placeholder="请填写您的地址"
      ></el-input>
    </div>
    <v-button
      class="confirm-button"
      text="立即获取3D图纸"
      type="primary"
    ></v-button>
    <div class="hint-message">
      *姓名、手机号、邮箱为必填项，填写完整才可提交哦
    </div>
  </div>
</template>
<script>
import DocumentIcon from "@/assets/image/common/document.png";
export default {
  data() {
    return {
      DocumentIcon,
      formData: {},
    };
  },
};
</script>
<style lang="scss" scoped>
.work-item-form {
  padding: 2.25rem 1.25rem;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-family: PingFangSC, PingFangSC-Heavy;
    font-weight: 800;
    color: #99c901;
    line-height: 1.375rem;
    margin-bottom: 1rem;
    .title-icon {
      width: 0.875rem;
      height: 0.875rem;
      margin-right: 0.5rem;
    }
  }
  .tip {
    width: 15.5rem;
    font-size: 0.8125rem;
    font-family: PingFangSC, PingFangSC-Regular;
    text-align: center;
    color: #333333;
    line-height: 1.125rem;
    margin: auto;
    margin-bottom: 1.5rem;
  }
  .input-wrap {
    display: flex;
    align-items: center;
    border: 0.0625rem solid #99c901;
    border-radius: 0.25rem;
    margin-bottom: 1.25rem;
    .label {
      position: relative;
      width: 5.375rem;
      flex-shrink: 0;
      font-size: 0.875rem;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #333333;
      line-height: 1.25rem;
      padding: 0.75rem 1rem;
      padding-right: 0;
    }
    .required {
      position: absolute;
      left: 0.25rem;
      font-size: 1rem;
      font-family: PingFangSC, PingFangSC-Heavy;
      font-weight: 800;
      color: #ff0000;
      line-height: 1.375rem;
    }
    /deep/ .el-input .el-input__inner {
      border: none;
      outline: none;
      font-size: 0.875rem;
      padding-left: 0.5rem;
      color: #333333;
    }
  }
  .confirm-button {
    height: 3rem;
    margin: 0.625rem auto;
  }
  .hint-message {
    text-align: center;
    font-size: 0.75rem;
    font-family: PingFangSC, PingFangSC-Regular;
    color: #ff0000;
    line-height: 1.0625rem;
  }
}
</style>
