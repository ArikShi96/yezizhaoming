<template>
  <div class="system-image-page" v-loading="loading">
    <el-tabs
      class="system-image-list"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="tab in imageTabs || []"
        :key="tab.id"
        :label="tab.name"
        :name="tab.id + ''"
      >
        <div class="image-list" v-lazy-container="{ selector: 'img' }">
          <img
            v-for="(image, index) in imageMap[tab.id] || []"
            :key="index"
            class="image-item"
            :data-src="image.url"
            @click="viewImage(image)"
          />
          <!-- <div
            v-for="(image, index) in imageMap[tab.id] || []"
            :key="index"
            class="image-item"
            :style="{ backgroundImage: 'url(' + image.url + ')' }"
            @click="viewImage(image)"
          ></div> -->
          <div
            v-if="(imageMap[tab.id] || []).length === 0"
            class="empty-message"
          >
            暂无数据
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { HOME_API } from "@/utils/api.js";
export default {
  data() {
    return {
      imageTabs: "",
      imageMap: {},
      activeName: "",
      loading: false,
    };
  },
  mounted() {
    this.fetchImageTabs();
  },
  methods: {
    async fetchImageTabs() {
      this.loading = true;
      try {
        const res = await HOME_API.storeCategories();
        this.imageTabs = res.data || [];
        if (this.imageTabs.length) {
          this.activeName = this.imageTabs[0].id + "";
          await this.fetchImageList(this.activeName);
        }
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    async fetchImageList(id) {
      if (!this.imageMap[id]) {
        try {
          const res = await HOME_API.storeImages({ category_id: id });
          this.imageMap[id] = res.data;
        } catch (err) {
          this.$alert(err.message);
        }
      }
    },
    async handleClick() {
      this.loading = true;
      await this.fetchImageList(this.activeName);
      this.loading = false;
    },
    viewImage(image) {
      this.$router.push({
        path: this.$route.query.reselect
          ? `/create/system-image/${image.id}?category_id=${image.category_id}&reselect=true`
          : `/create/system-image/${image.id}?category_id=${image.category_id}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.system-image-page {
  min-height: 100vh;
}
.system-image-list {
  .image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .image-item {
      width: 49.8%;
      height: 18rem;
      object-fit: cover;
      margin-bottom: 0.125rem;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    .empty-message {
      margin: auto;
      margin-top: 2.5rem;
      color: #666666;
      font-size: 1rem;
    }
  }
}
</style>
