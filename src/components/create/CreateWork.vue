<template>
  <div
    v-if="visible"
    class="create-work"
    :style="{ backgroundImage: 'url(' + formData.backgroundImage + ')' }"
  >
    <!-- 操作按钮 -->
    <img class="back-icon" :src="BackIcon" alt="" />
    <div class="add-type">
      <img class="icon" :src="AddIcon" alt="" /> 添加灯型
    </div>
    <div class="switch-theme">
      <img class="icon" :src="RefreshIcon" alt="" /> 切换场景
    </div>
    <!-- 所有编辑部件 -->
    <div class="drag-list">
      <dragable-item
        v-for="(item, index) in formData.list"
        :key="index"
        :img="item.img"
        :index="index"
        @on-delete="handleDelete"
        @on-lock="handleLock"
        @on-add="handleAdd"
      ></dragable-item>
    </div>
    <!-- 底部弹出 -->
    <div class="expand-wrap">
      <div class="expand-icon-wrap" :class="{ visible: expand }">
        <div class="expand-icon" @click="expand = !expand">
          <span>{{ expand ? "隐藏" : "展开" }}</span>
          <i class="el-icon-d-arrow-left"></i>
        </div>
      </div>
      <div class="scroll-list" :class="{ visible: expand }">
        <div class="scroll-tabs">
          <div class="scroll-tab more">
            <span>更多</span>
            <span class="new-tag">New</span>
          </div>
          <div
            v-for="(tab, index) in allItems"
            :key="index"
            class="scroll-tab"
            :class="{ selected: tab.selected }"
            @click="selectTab(index)"
          >
            {{ tab.tab }}
          </div>
        </div>
        <div class="scroll-items">
          <div
            v-for="(item, index) in scrollItems"
            :key="index"
            class="scroll-item"
            :class="{ selected: item.selected }"
            :style="{ backgroundImage: 'url(' + BgImg + ')' }"
          >
            <div class="item-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 操作 -->
    <div class="create-work-actions">
      <v-button text="取消" type="gray"></v-button>
      <v-button text="完成" type="primary"></v-button>
    </div>
    <!-- 配件弹窗 -->
    <accessory-drawer
      :visible="showAccessoryDrawer"
      @cancel="showAccessoryDrawer = false"
    ></accessory-drawer>
  </div>
</template>
<script>
import DragableItem from "@/components/create/dragable/index.vue";
import BgImg from "@/assets/image/test/bg.jpg";
import AddIcon from "@/assets/image/common/add.png";
import BackIcon from "@/assets/image/common/back.png";
import RefreshIcon from "@/assets/image/common/refresh.png";
// 配件弹窗
import AccessoryDrawer from "@/components/create/AccessoryDrawer.vue";
export default {
  components: {
    DragableItem,
    // 配件弹窗
    AccessoryDrawer,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      showAccessoryDrawer: false, // 配件弹窗
      expand: false,
      AddIcon,
      BackIcon,
      RefreshIcon,
      BgImg,
      allItems: [],
      // 创作内容
      formData: {
        backgroundImage: BgImg,
        list: [{ img: BgImg }],
      },
    };
  },
  computed: {
    scrollItems() {
      if (this.allItems.length) {
        return (
          this.allItems.find((tab) => {
            return tab.selected;
          }) || { items: [] }
        ).items;
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.fetchAllItems();
  },
  methods: {
    // 列表操作
    handleAdd(index) {
      this.$set(this.formData, "list", [
        ...this.formData.list,
        this.formData.list[index],
      ]);
    },
    handleDelete(index) {
      this.formData.list.splice(index, 1);
    },
    handleLock(index) {
      this.$set(
        this.formData.list[index],
        "locked",
        !this.formData.list[index].locked
      );
    },
    // 更多选择
    fetchAllItems() {
      this.allItems = [
        {
          selected: true,
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
    },
    // 底部操作
    selectTab(selectedIndex) {
      this.allItems = this.allItems.map((tab, index) => {
        tab.selected = selectedIndex === index;
        return tab;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.create-work {
  height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .back-icon {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 1.625rem;
    height: 1.625rem;
    z-index: 9;
  }
  .add-type,
  .switch-theme {
    z-index: 9;
    position: absolute;
    right: 0.375rem;
    display: flex;
    align-items: center;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.75rem;
    padding: 0.25rem 0.375rem;
    font-size: 0.75rem;
    font-family: PingFangSC, PingFangSC-Medium;
    color: #333333;
    line-height: 1.0625rem;
    letter-spacing: 0rem;
    .icon {
      width: 0.6875rem;
      height: auto;
      margin-right: 0.125rem;
    }
  }
  .add-type {
    top: 0.625rem;
  }
  .switch-theme {
    top: 2.75rem;
  }
  .expand-wrap {
    .expand-icon-wrap {
      position: fixed;
      bottom: 1.7rem; // TODO
      left: 0;
      width: 100%;
      text-align: center;
      transition: bottom 0.5s;
      .expand-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 1rem;
        width: 4.125rem;
        background-color: rgba($color: #000000, $alpha: 0.5);
        border-radius: 6.25rem 6.25rem 0rem 0rem;
        font-size: 0.625rem;
        font-family: PingFangSC, PingFangSC-Regular;
        color: #ffffff;
        .el-icon-d-arrow-left {
          margin-left: 0.25rem;
          transform: rotate(90deg);
          font-size: 0.75rem;
        }
      }
      &.visible {
        bottom: 7.7rem; // TODO
        .el-icon-d-arrow-left {
          transform: rotate(-90deg);
        }
      }
    }
    .scroll-list {
      position: fixed;
      bottom: 1.75rem;
      left: 0;
      width: 100%;
      height: 0;
      overflow-x: auto;
      overflow-y: hidden;
      transition: height 0.5s;
      background-color: rgba($color: #000000, $alpha: 0.5);
      &.visible {
        height: 6rem;
      }
      .scroll-tabs {
        display: flex;
        .scroll-tab {
          flex-shrink: 0;
          padding: 0.25rem 0.875rem;
          font-size: 0.75rem;
          font-family: PingFangSC, PingFangSC-Heavy;
          font-weight: 800;
          color: #e2e2e2;
          &.selected {
            color: #99c901;
          }
          &.more {
            position: relative;
            font-size: 0.75rem;
            font-family: PingFangSC, PingFangSC-Heavy;
            font-weight: 800;
            color: #ffffff;
            background: #99c901;
            padding-right: 1.25rem;
            .new-tag {
              position: absolute;
              top: 0.125rem;
              right: 0.125rem;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 1.25rem;
              height: 0.625rem;
              background: #ffffff;
              border-radius: 0.375rem;
              font-size: 0.4375rem;
              font-family: PingFangSC, PingFangSC-Heavy;
              font-weight: 800;
              color: #99c901;
            }
          }
        }
      }
      .scroll-items {
        display: flex;
        .scroll-item {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          padding: 0.25rem;
          flex-shrink: 0;
          height: 3.75rem;
          width: 3.75rem;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          margin: 0.25rem;
          font-size: 0.625rem;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #333333;
          &:active,
          &:focus,
          &.selected {
            border: 0.125rem solid #ffcc19;
          }
        }
      }
    }
  }
  .create-work-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0.25rem 1.25rem;
    width: 100%;
    z-index: 10;
    background-color: #ffffff;
    /deep/ .custom-button {
      font-size: 0.875rem;
      width: 3.75rem;
      height: 1.25rem;
    }
  }
}
</style>
