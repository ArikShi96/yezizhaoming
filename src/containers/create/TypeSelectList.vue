<template>
  <div class="type-select-page" v-loading="loading">
    <div class="title">
      <img class="icon" :src="LoveIcon" alt="" />
      <span>选择您要创作的灯型</span>
    </div>
    <div class="select-list">
      <div
        v-for="(item, index) in items || []"
        :key="index"
        class="select-item"
        :class="{ selected: item.selected }"
        @click="selectItem(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="next-step">
      <v-button
        text="下一步"
        type="primary"
        @onClick="handleNextClick"
      ></v-button>
    </div>
  </div>
</template>
<script>
import LoveIcon from "@/assets/image/common/loveIcon.png";
import store from "@/utils/store.js";
import { CREATE_API } from "@/utils/api.js";
export default {
  data() {
    return {
      LoveIcon,
      items: "",
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const res = await CREATE_API.categories({});
      this.items = res.data || [];
    } catch (err) {
      this.$alert(err.message);
    }
    this.loading = false;
  },
  methods: {
    selectItem(selectedIndex) {
      this.items = this.items.map((item, index) => {
        item.selected = selectedIndex === index;
        return item;
      });
    },
    handleNextClick() {
      const selected = this.items.find((item) => {
        return item.selected;
      });
      if (!selected) {
        this.$alert("请选择要创作的灯型");
        return;
      }
      store.setSelectType(selected);
      this.$router.push({ path: "/create/work" });
    },
  },
};
</script>
<style lang="scss" scoped>
.type-select-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 2rem 1rem 4rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-family: PingFangSC, PingFangSC-Regular;
    color: #202020;
    .icon {
      height: 1.25rem;
      width: 1.25rem;
      margin-right: 0.5rem;
    }
  }
  .select-list {
    padding-top: 2.5rem;
    .select-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
      width: 21.25rem;
      height: 2.5rem;
      background: #f5f6f0;
      border-radius: 1.25rem;
      font-size: 0.875rem;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #202020;
      &.selected {
        background: #e6eece;
        border: 0.0625rem solid #99c901;
        color: #99c901;
      }
    }
  }
  .next-step {
    position: fixed;
    z-index: 10;
    left: 1rem;
    bottom: 0;
    padding-bottom: 1rem;
    background-color: #ffffff;
    /deep/ .custom-button {
      width: 21.25rem;
      height: 2.875rem;
    }
  }
}
</style>
