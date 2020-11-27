<template>
  <div class="system-template-page">
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
      <img
        v-for="(template, index) in templates || []"
        :key="index"
        class="template-item"
        :src="template"
        @click="viewTemplate(template)"
      />
    </scroller>
    <!-- <div v-if="templates && templates.length === 0" class="empty-message">
      暂无数据
    </div> -->
  </div>
</template>
<script>
import { HOME_API } from "@/utils/api.js";
export default {
  data() {
    return {
      templates: "",
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
        await this.fetchTemplateList(done);
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
          await this.fetchTemplateList(done);
        }
      }, 500);
    },
    async fetchTemplateList(done) {
      try {
        const res = await HOME_API.tplImages({ page: this.page });
        // res.data = [{}, {}];
        // if (this.page < 3) {
        //   res.data = [...res.data, ...res.data, ...res.data];
        // }
        if (this.page === 1) {
          this.templates = res.data || [];
        } else {
          this.templates = [...this.templates, ...(res.data || [])];
        }
        if ((res.data || []).length < 20) {
          this.noData = true;
        }
        done();
      } catch (err) {
        this.$alert(err.message);
      }
    },
    viewTemplate(template) {
      this.$router.push({
        path: this.$route.query.reselect
          ? `/create/system-template/${template.id}?reselect=true`
          : `/create/system-template/${template.id}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.system-template-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.625rem;
  min-height: 100vh;
  .template-item {
    width: 32%;
    height: 10.625rem;
    margin-bottom: 0.625rem;
  }
  .empty-message {
    margin: auto;
    margin-top: 2.5rem;
    color: #666666;
    font-size: 1rem;
  }
}
</style>
