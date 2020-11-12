<template>
  <v-dialog
    :visible="visible"
    cancelText="取消"
    confirmText="立即获取"
    @cancel="$emit('cancel')"
    @confirm="handleConfirm"
  >
    <div class="dialog-title">温馨提示</div>
    <div class="dialog-tip">
      您搭配的配饰可以获取3D图纸哦～ 立即获取图纸吧？
    </div>
  </v-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleConfirm() {
      this.$emit("");
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-title {
  opacity: 0.9;
  font-size: 1.0625rem;
  font-family: PingFangSC, PingFangSC-Medium;
  text-align: center;
  color: #000000;
  margin-bottom: 1.25rem;
}
.dialog-tip {
  margin: 0.625rem auto;
  font-size: 0.875rem;
  font-family: PingFangSC, PingFangSC-Regular;
  text-align: center;
  color: #333333;
  line-height: 1.5rem;
}
</style>
