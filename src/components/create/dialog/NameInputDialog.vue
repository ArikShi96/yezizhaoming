<template>
  <v-dialog
    :visible="visible"
    cancelText="取消"
    confirmText="确定"
    @cancel="$emit('cancel')"
    @confirm="handleConfirm"
  >
    <div class="dialog-title">给作品起个名字吧～</div>
    <div class="dialog-content">
      <el-input placeholder="请输入作品名称" v-model="workName"></el-input>
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
    return {
      workName: "",
    };
  },
  methods: {
    handleConfirm() {
      this.$emit("input-work-name", this.workName);
      this.workName = "";
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
}
.dialog-content {
  text-align: center;
  margin: 1.5rem auto;
  font-size: 0.875rem;
}
</style>
