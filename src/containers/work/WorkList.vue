<template>
  <div class="work-list-page" v-loading="loading">
    <work-item
      v-for="(work, index) in workList"
      :key="index"
      :item="work"
      @on-click="navigateDetail(work)"
    />
  </div>
</template>
<script>
import { WORK_API } from "@/utils/api.js";
import WorkItem from "@/components/work/WorkItem.vue";
export default {
  components: {
    WorkItem,
  },
  data() {
    return {
      workList: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchWorkList();
  },
  methods: {
    async fetchWorkList() {
      this.loading = true;
      try {
        const res = await WORK_API.list({});
        this.workList = res.data || [];
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    // 跳转
    navigateDetail(work) {
      this.$router.push({ path: `/work-detail/${work.id}` });
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
