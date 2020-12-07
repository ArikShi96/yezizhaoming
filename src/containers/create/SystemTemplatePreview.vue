<template>
  <div class="system-template-preview-page">
    <img
      v-loading="loading"
      class="preview-image"
      :src="currentItem.url"
      alt=""
    />
    <div class="preview-actions">
      <div class="preview-action" @click="backList">重新选择</div>
      <div class="preview-action" @click="confirm">立即使用</div>
    </div>
  </div>
</template>
<script>
import store from "@/utils/store.js";
import { HOME_API } from "@/utils/api.js";
export default {
  data() {
    return {
      template: "",
      loading: false,
      currentItem: {},
    };
  },
  mounted() {
    this.fetchTemplateDetail();
  },
  methods: {
    async fetchTemplateDetail() {
      try {
        this.loading = true;
        const res = await HOME_API.getTplDetail({ id: this.$route.params.id });
        this.currentItem = res.data || {};
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    backList() {
      this.$router.go(-1);
    },
    async confirm() {
      store.setBackgroundImage({ type: 1, id: this.$route.params.id });
      if (this.$route.query.reselect) {
        this.$router.push({ path: "/create/work" });
      } else {
        this.$router.push({ path: "/create/name-input" });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.system-template-preview-page {
  height: 100vh;
  position: relative;
  .preview-image {
    width: 100%;
    height: calc(100% - 2.25rem);
    object-fit: cover;
  }
  .preview-actions {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-family: PingFangSC, PingFangSC-Heavy;
    font-weight: 800;
    color: #99c901;
  }
}
</style>
