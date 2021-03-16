<template>
  <div v-if="visible" class="more-select">
    <div class="action-wrap" @click="$emit('cancel')">取消</div>
    <div class="scroll-wrap">
      <div
        v-for="tab in allTabs"
        :key="tab.id"
        class="scroll-item"
        :class="{ 'is-active': tab.id === activeName }"
        @click="scrollToSection(tab.id)"
      >
        {{ tab.name || "" }}
      </div>
    </div>
    <div class="items-wrap">
      <div v-for="tab in allTabs" :key="tab.id" class="item-wrap">
        <div class="items-title" :data-title="tab.id">
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
    </div>
  </div>
</template>
<script>
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
    initActiveName: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
    },
  },
  data() {
    return {
      activeName: "",
      allTabMap: {},
    };
  },
  watch: {
    async visible() {
      if (this.allTabs.length && this.visible) {
        this.activeName = this.initActiveName || this.allTabs[0].id;
        await Promise.all(
          this.allTabs.map((tab) => {
            return this.fetchTabItems(tab.id);
          })
        );
        this.scrollToSection(this.activeName);
      }
    },
    // activeName() {
    //   this.fetchTabItems(this.activeName);
    // },
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
    scrollToSection(c_id) {
      this.activeName = c_id;
      let top = 0;
      document.querySelectorAll(".items-title").forEach((el) => {
        if (el.dataset.title === c_id + "") {
          top = el.offsetTop;
        }
      });
      document
        .querySelector(".items-wrap")
        .scrollTo({ top, left: 0, behavior: "smooth" });
    },
  },
};
</script>
<style lang="scss" scoped>
.more-select {
  display: flex;
  .scroll-wrap {
    flex: 0 0 25%;
    border-right: 0.0625rem solid #eeeeee;
    height: 100vh;
    overflow-y: auto;
    .scroll-item {
      display: inline-flex;
      align-items: center;
      padding: 1rem 1rem 0.75rem 1rem;
      font-size: 0.9375rem;
      font-family: PingFangSC, PingFangSC-Medium;
      color: #666666;
      line-height: 1.3125rem;
      width: 100%;
      &.is-active {
        font-family: PingFangSC, PingFangSC-Heavy;
        font-weight: 800;
        color: #99c901;
        border-right: 0.0625rem solid #99c901;
      }
    }
  }
  .items-wrap {
    flex: 0 0 75%;
    height: 100vh;
    overflow-y: auto;
    .item-wrap {
      margin-bottom: 1.25rem;
    }
  }
}
.action-wrap {
  font-size: 0.875rem;
  font-family: PingFangSC, PingFangSC-Heavy;
  font-weight: 800;
  text-align: right;
  color: #99c901;
  position: absolute;
  padding: 1.25rem;
  top: 0;
  right: 0;
  z-index: 100;
}
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
        object-fit: cover;
      }
    }
  }
}
</style>
