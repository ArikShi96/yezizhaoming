<template>
  <div class="work-preview-page" v-loading="loading">
    <img class="preview-img" :src="workItem.url" alt="" />
    <div class="preview-actions">
      <span class="action" @click="showDeleteModal = true">删除</span>
      <span class="action" @click="handleEdit">编辑</span>
    </div>
    <v-dialog
      :visible="showDeleteModal"
      cancelText="取消"
      confirmText="确定"
      @cancel="showDeleteModal = false"
      @confirm="handleDelete"
    >
      <div class="dialog-title">温馨提示</div>
      <div class="dialog-tip">您确认要删除当前作品吗？</div>
    </v-dialog>
  </div>
</template>
<script>
import { WORK_API } from "@/utils/api.js";
import store from "@/utils/store.js";
export default {
  data() {
    return {
      workItem: {},
      loading: false,
      showDeleteModal: false,
    };
  },
  mounted() {
    this.fetchWorkDetail();
  },
  methods: {
    async fetchWorkDetail() {
      this.loading = true;
      try {
        const res = await WORK_API.getDetail({ id: this.$route.params.id });
        this.workItem = res.data || [];
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    // 跳转
    async handleDelete() {
      try {
        await WORK_API.delete({ id: this.$route.params.id });
        this.$alert("删除成功");
      } catch (err) {
        this.$alert(err.message);
      }
      this.$router.push({ name: "WorkList" });
    },
    handleEdit() {
      store.clearAll();
      store.setWorkId(this.$route.params.id);
      store.setWorkName(this.workItem.title);
      this.$router.push({ path: `/create/work` });
    },
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
.dialog-title {
  opacity: 0.9;
  font-size: 1.0625rem;
  font-family: PingFangSC, PingFangSC-Medium;
  text-align: center;
  color: #000000;
  margin-bottom: 1.25rem;
}
.dialog-tip {
  margin: 0.625rem auto;
  font-size: 0.875rem;
  font-family: PingFangSC, PingFangSC-Regular;
  text-align: center;
  color: #333333;
  line-height: 1.5rem;
}
</style>
