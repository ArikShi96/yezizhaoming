<template>
  <div class="name-input-page">
    <name-input-dialog
      @cancel="handleCancel"
      @input-work-name="inputWorkName"
    ></name-input-dialog>
  </div>
</template>
<script>
import NameInputDialog from "@/containers/create/dialog/NameInputDialog.vue";
export default {
  components: {
    NameInputDialog,
  },
  methods: {
    // 输入作品名称
    inputWorkName() {
      this.$router.push({ path: "/create/type-select" });
    },
    handleCancel() {
      this.$router.push({ path: "/create/image-select" });
    },
  },
};
</script>
<style lang="scss" scoped>
.name-input-page {
  height: 100vh;
}
</style>
