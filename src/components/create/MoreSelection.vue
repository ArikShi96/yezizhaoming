<template>
  <el-tabs v-if="visible" tab-position="left" v-model="activeName">
    <el-tab-pane
      v-for="tab in allItems"
      :key="tab.tab"
      :label="tab.tab"
      :name="tab.tab"
    >
      <div class="items-wrap">
        <div class="items-title">
          <span class="line"></span>
          <span>{{ tab.tab }}</span>
          <span class="line"></span>
        </div>
        <div class="item-list">
          <div v-for="(item, index) in tab.items" :key="index" class="item">
            <img class="item-image" :src="item.img" alt="" />
            <div class="item-name">{{ item.name }}</div>
          </div>
          <div v-if="tab.items.length % 3 === 2" style="width: 3.75rem"></div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import BgImg from "@/assets/image/test/bg.jpg";
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      BgImg,
      activeName: "",
      allItems: [],
    };
  },
  mounted() {
    this.fetchAllItems();
  },
  methods: {
    fetchAllItems() {
      this.allItems = [
        {
          tab: "灵通系列 (平面吊灯)",
          items: [
            { img: BgImg, name: "A01" },
            { img: BgImg, name: "A02" },
            { img: BgImg, name: "A03" },
            { img: BgImg, name: "A04" },
          ],
        },
        {
          tab: "2.0吊灯",
          items: [
            { img: BgImg, name: "A01" },
            { img: BgImg, name: "A02" },
            { img: BgImg, name: "A03" },
            { img: BgImg, name: "A04" },
            { img: BgImg, name: "A05" },
          ],
        },
        {
          tab: "标题文字",
          items: [
            { img: BgImg, name: "A01" },
            { img: BgImg, name: "A02" },
            { img: BgImg, name: "A03" },
            { img: BgImg, name: "A04" },
            { img: BgImg, name: "A05" },
            { img: BgImg, name: "A06" },
          ],
        },
      ];
      this.activeName = this.allItems.length ? this.allItems[0].tab : "";
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
