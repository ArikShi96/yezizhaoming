<template>
  <div class="custom-radio" @click="$emit('on-click')">
    <span v-if="checked" class="radio accept"
      ><i class="el-icon-check"></i
    ></span>
    <span v-else class="radio"></span>
  </div>
</template>
<script>
export default {
  props: {
    checked: {
      type: Boolean,
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-radio {
  .radio {
    display: flex;
    align-items: center;
    justify-content: center;
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
}
</style>
