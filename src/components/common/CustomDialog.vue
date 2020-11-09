<template>
  <div v-if="visible" class="custom-dialog">
    <div class="dialog-modal">
      <slot />
      <div v-if="cancelText || confirmText" class="dialog-actions">
        <v-button
          v-if="cancelText"
          :text="cancelText"
          type="default"
          @onClick="handleCancelClick"
        ></v-button>
        <v-button
          v-if="confirmText"
          :text="confirmText"
          type="primary"
          :loading="loading"
          @onClick="handleConfirmClick"
        ></v-button>
      </div>
      <img
        v-if="showCloseIcon"
        class="delete-icon"
        src="@/assets/image/common/delete.png"
        alt=""
        @click="handleCancelClick"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
    },
    showCloseIcon: {
      type: Boolean,
    },
    cancelText: {
      type: String,
    },
    confirmText: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleCancelClick() {
      this.$emit("cancel");
    },
    async handleConfirmClick() {
      this.loading = true;
      await this.$emit("confirm");
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-dialog {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($color: #000000, $alpha: 0.5);
  padding: 0 2.25rem;
  .dialog-modal {
    position: relative;
    background: #ffffff;
    border-radius: 0.5rem;
    padding: 2rem 1.5rem 1.25rem;
    .dialog-actions {
      display: flex;
      /deep/ .custom-button {
        min-width: 6.25rem;
        &.default {
          margin-right: 2.25rem;
        }
      }
    }
    .delete-icon {
      position: absolute;
      z-index: 100;
      width: 1.75rem;
      height: 1.75rem;
      top: -0.875rem;
      right: -0.875rem;
    }
  }
}
</style>
