<template>
  <div class="work-detail-page" v-loading="loading">
    <work-item
      :basicItem="workItem"
      :detailItem="workItem"
      @on-click="navigatePreview"
    />
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
    <qr-code-dialog
      :visible="showQrCodeDialog"
      @cancel="showQrCodeDialog = false"
    ></qr-code-dialog>
  </div>
</template>
<script>
import { WORK_API } from "@/utils/api.js";
import WorkItem from "@/components/work/WorkItem.vue";
import QrCodeDialog from "@/containers/create/dialog/QrCodeDialog.vue";
// import { AUTH_API } from "@/utils/api.js";
export default {
  components: {
    WorkItem,
    QrCodeDialog,
  },
  data() {
    return {
      workItem: {},
      loading: false,
      showQrCodeDialog: false,
    };
  },
  // async beforeRouteEnter(to, from, next) {
  //   if (from.name === "CreateWork") {
  //     const res = await AUTH_API.getFullUserInfo({});
  //     next((vm) => {
  //       vm.showQrCodeDialog = !res.data.subscribe;
  //     });
  //   } else {
  //     next();
  //   }
  // },
  mounted() {
    this.fetchWorkDetail();
  },
  methods: {
    async fetchWorkDetail() {
      this.loading = true;
      try {
        const res = await WORK_API.getDetail({ id: this.$route.params.id });
        this.workItem = res.data || {};
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    // 跳转
    navigateHome() {
      this.$router.push({ path: "/" });
    },
    navigateWorkList() {
      this.$router.push({ name: "WorkList" });
    },
    navigatePreview() {
      this.$router.push({ path: `/work-preview/${this.workItem.id}` });
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
    bottom: 1.75rem;
    z-index: 10;
    /deep/ .custom-button {
      width: 7.5rem;
      margin: 0 1rem;
    }
  }
}
</style>
