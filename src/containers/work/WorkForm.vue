<template>
  <div class="work-form-page">
    <work-item-form-success
      v-if="showSuccess"
      :visible="showSuccess"
    ></work-item-form-success>
    <work-item-form v-else @confirm="showSuccess = true"></work-item-form>
  </div>
</template>
<script>
import WorkItemForm from "@/components/work/WorkItemForm.vue";
import WorkItemFormSuccess from "@/components/work/WorkItemFormSuccess.vue";
export default {
  components: {
    WorkItemForm,
    WorkItemFormSuccess,
  },
  data() {
    return {
      showSuccess: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.work-form-page {
  height: 100%;
  width: 100%;
}
</style>
