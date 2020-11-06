<template>
  <div
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    :class="className"
    @click="handleClick"
  >
    {{ text }}
  </div>
</template>
<script>
/* eslint-disable vue/custom-event-name-casing */
export default {
  props: {
    text: {
      type: String,
    },
    type: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  computed: {
    className() {
      return `custom-button ${this.disabled ? "disabled" : ""} ${this.type}`;
    },
  },
  methods: {
    handleClick() {
      if (this.loading || this.disabled) {
        return;
      }
      this.$emit("onClick");
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-button {
  font-family: PingFang, PingFang-SC;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  border-radius: 1.25rem;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.625rem;
  height: 2.5rem;
  &.disabled,
  &:active,
  &:focus {
    opacity: 0.7;
  }
  &.disabled {
    pointer-events: none;
  }
  &.primary {
    background: #99c901;
  }
  &.primary-plain {
    background: #e6eece;
    border: 0.0625rem solid #99c901;
    color: #99c901;
  }
  &.default {
    background: #ffffff;
    border: 0.0625rem solid #ededed;
    color: #666666;
  }
  /deep/ .el-loading-spinner {
    margin-top: -0.625rem;
    .el-icon-loading {
      color: #99c901;
    }
  }
}
</style>
