<template>
  <div class="system-template-page" v-loading="loading">
    <img
      v-for="(template, index) in templates || []"
      :key="index"
      class="template-item"
      :src="template"
      @click="viewTemplate(template)"
    />
    <div v-if="templates && templates.length === 0" class="empty-message">
      暂无数据
    </div>
  </div>
</template>
<script>
import { HOME_API } from "@/utils/api.js";
export default {
  data() {
    return {
      templates: "",
      loading: false,
    };
  },
  mounted() {
    this.fetchTemplateList();
  },
  methods: {
    async fetchTemplateList() {
      this.loading = true;
      try {
        const res = await HOME_API.tplImages({});
        this.templates = res.data || [];
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    viewTemplate(template) {
      this.$router.push({ path: `/create/system-template/${template.id}` });
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
