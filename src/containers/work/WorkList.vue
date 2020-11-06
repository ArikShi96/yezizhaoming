<template>
  <div class="work-list-page">
    <work-item
      v-for="(work, index) in workList"
      :key="index"
      :item="work"
      @on-click="navigateDetail"
    />
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
      workList: [],
    };
  },
  mounted() {
    this.fetchWorkList();
  },
  methods: {
    async fetchWorkList() {
      this.workList = [{}, {}];
    },
    // 跳转
    navigateDetail() {
      this.$router.push({ path: "/work-detail/123" });
    },
  },
};
</script>
<style lang="scss" scoped>
.work-list-page {
  background-color: #ededed;
  padding-bottom: 0.5rem;
  min-height: 100%;
}
</style>
