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
  </div>
</template>
<script>
import WorkItem from "@/components/work/WorkItem.vue";
export default {
  components: {
    WorkItem,
  },
  data() {
    return {
      workItem: {},
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
    z-index: 99;
    /deep/ .custom-button {
      width: 7.5rem;
      margin: 0 1rem;
    }
  }
}
</style>
