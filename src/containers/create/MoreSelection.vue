<template>
  <div v-if="visible" class="more-select">
    <el-tabs tab-position="left" v-model="activeName">
      <el-tab-pane
        v-for="tab in allTabs"
        :key="tab.id"
        :label="tab.name"
        :name="tab.id + ''"
      >
        <div class="items-wrap">
          <div class="items-title">
            <span class="line"></span>
            <span>{{ tab.name || "" }}</span>
            <span class="line"></span>
          </div>
          <div class="item-list">
            <div
              v-for="item in allTabMap[tab.id] || []"
              :key="item.id"
              class="item"
              @click="$emit('select-item', item)"
            >
              <img class="item-image" :src="item.img" alt="" />
              <div class="item-name">{{ item.name }}</div>
            </div>
            <div
              v-if="allTabMap[tab.id] && allTabMap[tab.id].length % 3 === 2"
              style="width: 3.75rem"
            ></div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BgImg from "@/assets/image/test/bg.jpg";
import { CREATE_API } from "@/utils/api.js";
// 配件弹窗
export default {
  props: {
    visible: {
      type: Boolean,
    },
    allTabs: {
      type: Array,
    },
  },
  data() {
    return {
      BgImg,
      activeName: "",
      allTabMap: {},
    };
  },
  watch: {
    visible() {
      if (this.allTabs.length && this.visible) {
        this.activeName = this.allTabs[0].id + "";
      }
    },
    activeName() {
      this.fetchTabItems(this.activeName);
    },
  },
  methods: {
    async fetchTabItems(c_id) {
      if (!this.allTabMap[c_id] && c_id) {
        try {
          const res = await CREATE_API.storeList({ c_id });
          this.$set(this.allTabMap, c_id, res.data || []);
        } catch (err) {
          this.$alert(err.message);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.items-wrap {
  padding: 1.25rem 1.5rem;
  .items-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-family: PingFang, PingFang-SC;
    text-align: center;
    color: #333333;
    margin-bottom: 1.25rem;
    .line {
      width: 1.875rem;
      height: 0.0625rem;
      background-color: #ededed;
      margin: 0 0.625rem;
    }
  }
  .item-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .item {
      margin-bottom: 1rem;
      font-size: 0.75rem;
      font-family: PingFangSC, PingFangSC-Regular;
      text-align: center;
      color: #333333;
      .item-image {
        width: 3.75rem;
        height: 3.75rem;
        margin-bottom: 0.625rem;
      }
    }
  }
}
</style>
