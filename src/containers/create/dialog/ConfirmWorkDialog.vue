<template>
  <v-dialog
    :visible="visible"
    cancelText="取消"
    confirmText="保存"
    @cancel="$emit('cancel')"
    @confirm="handleConfirm"
  >
    <div class="dialog-title">添加新灯型需保存已装好的灯具，是否保存？</div>
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
      this.$emit("confirm");
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
.dialog-content {
  text-align: center;
  margin: 1.5rem auto;
  font-size: 0.875rem;
}
</style>
