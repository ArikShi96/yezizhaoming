<template>
  <div class="work-list-page">
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
      <work-item
        v-for="(work, index) in workList"
        :key="index"
        :basicItem="work"
        @on-click="navigateDetail(work)"
      />
    </scroller>
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
      page: 0,
      noData: false,
    };
  },
  mounted() {},
  methods: {
    /**
     * 下拉刷新
     */
    refresh(done) {
      setTimeout(async () => {
        this.page = 1;
        this.noData = false;
        await this.fetchWorkList(done);
      }, 500);
    },

    /**
     * 上拉获取
     */
    infinite(done) {
      setTimeout(async () => {
        this.page = this.page + 1;
        if (this.noData) {
          this.$refs.myscroller.finishInfinite(true);
        } else {
          await this.fetchWorkList(done);
        }
      }, 500);
    },
    async fetchWorkList(done) {
      try {
        const res = await WORK_API.list({ page: this.page });
        // res.data = [{}, {}];
        // if (this.page < 3) {
        //   res.data = [...res.data, ...res.data, ...res.data];
        // }
        if (this.page === 1) {
          this.workList = res.data || [];
        } else {
          this.workList = [...this.workList, ...(res.data || [])];
        }
        this.$refs.myscroller.finishInfinite(true);
        if ((res.data || []).length < 20) {
          this.noData = true;
        }
        done();
      } catch (err) {
        this.$alert(err.message);
      }
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
/deep/ .custom-dialog {
  margin-top: 60px;
}
</style>
