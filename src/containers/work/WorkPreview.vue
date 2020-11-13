<template>
  <div class="work-preview-page" v-loading="loading">
    <img class="preview-img" :src="BgImg" alt="" />
    <div class="preview-actions">
      <span class="action" @click="handleDelete">删除</span>
      <span class="action" @click="handleEdit">编辑</span>
    </div>
  </div>
</template>
<script>
import { WORK_API } from "@/utils/api.js";
import BgImg from "@/assets/image/test/bg2.png";
export default {
  data() {
    return {
      BgImg,
      workItem: {},
      loading: false,
    };
  },
  methods: {
    async fetchWorkDetail() {
      try {
        const res = await WORK_API.getDetail({ id: this.$route.params.id });
        this.workItem = res.data || [];
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    // 跳转
    handleDelete() {},
    handleEdit() {},
  },
};
</script>
<style lang="scss" scoped>
.work-preview-page {
  height: 100%;
  .preview-img {
    width: 100%;
    height: calc(100% - 1.625rem);
    object-fit: cover;
  }
  .preview-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    font-family: PingFangSC, PingFangSC-Heavy;
    font-weight: 800;
    text-align: center;
    color: #99c901;
    padding: 0 1.25rem;
  }
}
</style>
