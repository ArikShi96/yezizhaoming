<template>
  <div v-if="visible" class="custom-alert">
    <div class="message-wrap" :style="{ 'margin-top': top }">{{ message }}</div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
    },
    top: {
      type: String,
      default: "1.5rem",
    },
  },
  watch: {
    message() {
      if (this.message && !this.visible) {
        this.visible = true;
        this.hideAlert();
      }
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    hideAlert() {
      setTimeout(() => {
        this.visible = false;
        this.$emit("on-alert-hide");
      }, 4000);
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-alert {
  z-index: 9999;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
.message-wrap {
  display: inline-flex;
  align-items: center;
  justify-items: center;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
}
</style>
