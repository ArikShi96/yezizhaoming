<template>
  <div class="work-detail-page">
    <work-item :item="workItem" />
    <div class="work-detail-links">
      <v-button
        text="首页"
        type="primary-plain-white"
        @onClick="navigateHome"
      ></v-button>
      <v-button
        text="我的作品"
        type="primary"
        @onClick="navigateWorkList"
      ></v-button>
    </div>
    <!-- 提示框 -->
    <fetch-tip-dialog :visible="showFetchTipDialog"></fetch-tip-dialog>
    <!-- 分享弹框 -->
    <work-share-dialog :visible="showWorkShareDialog"></work-share-dialog>
  </div>
</template>
<script>
import WorkShareDialog from "@/components/work/WorkShareDialog.vue";
import FetchTipDialog from "@/components/work/FetchTipDialog.vue";
import WorkItem from "@/components/work/WorkItem.vue";
export default {
  components: {
    WorkShareDialog,
    WorkItem,
    FetchTipDialog,
  },
  data() {
    return {
      workItem: {},
      showFetchTipDialog: false,
      showWorkShareDialog: true,
    };
  },
  mounted() {
    this.fetchWorkDetail();
  },
  methods: {
    async fetchWorkDetail() {
      this.workItem = {};
    },
    // 跳转
    navigateHome() {
      this.$router.push({ path: "/" });
    },
    navigateWorkList() {
      this.$router.push({ name: "WorkList" });
    },
  },
};
</script>
<style lang="scss" scoped>
.work-detail-page {
  height: 100%;
  background-color: #ededed;
  position: relative;
  .work-detail-links {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 7.5rem;
    z-index: 10;
    /deep/ .custom-button {
      width: 7.5rem;
      margin: 0 1rem;
    }
  }
}
</style>
