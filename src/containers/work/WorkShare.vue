<template>
  <!-- 分享弹框 -->
  <work-share-dialog
    v-loading="loading"
    :detailItem="detailItem"
    @cancel="navigateBack"
  ></work-share-dialog>
</template>
<script>
import WorkShareDialog from "@/components/work/WorkShareDialog.vue";
import { WORK_API } from "@/utils/api.js";
export default {
  components: {
    WorkShareDialog,
  },
  data() {
    return {
      loading: false,
      detailItem: {},
    };
  },
  mounted() {
    this.fetchWorkDetail();
  },
  methods: {
    async fetchWorkDetail() {
      this.loading = true;
      try {
        const res = await WORK_API.getDetail({ id: this.$route.params.id });
        this.detailItem = res.data || {};
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    navigateBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
