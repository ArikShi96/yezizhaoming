<template>
  <div class="work-item-wrap">
    <div class="work-item">
      <img
        class="expand-icon"
        :class="{ expand: expand }"
        :src="ArrowIcon"
        @click="expandFirst"
      />
      <img
        class="work-avatar"
        src="../../assets/image/test/bg.jpg"
        @click="$emit('on-click')"
      />
      <div class="work-detail">
        <div class="title">
          <span class="status-tag running">制作中</span>
          <span>北欧卧室灯大气家用卧室灯简云北欧卧室灯简云</span>
        </div>
        <div class="info">
          <div class="date">2010-10-20</div>
          <div class="price">¥345.00</div>
        </div>
        <div class="actions">
          <div class="action action-buy">
            <img class="icon" :src="ShoppingIcon" />
            <span>购买</span>
          </div>
          <div class="action action-fetch">
            <img class="icon" :src="FetchIcon" />
            <span>获取3D图纸</span>
          </div>
          <div class="action action-share">
            <img class="icon" :src="ShareIcon" />
            <span>分享海报</span>
          </div>
        </div>
      </div>
    </div>
    <div class="kind-list" :class="{ visible: expand }">
      <div v-for="(kind, index) in kinds" :key="index" class="kind-item">
        <div class="kind-title">
          <img
            class="expand-icon"
            :class="{ expand: kind.expand }"
            :src="ArrowIcon"
            @click="expandSecondary(index)"
          />
          <span>台灯(1)</span>
          <span class="price">¥345.56</span>
        </div>
        <div class="secondary-list" :class="{ visible: kind.expand }">
          <div
            v-for="(item, idx) in kind.items"
            :key="idx"
            class="secondary-item"
          >
            <span>台灯(1)</span>
            <span class="price price-small">¥345.56</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArrowIcon from "@/assets/image/common/arrow.png";
import ShareIcon from "@/assets/image/common/share.png";
import FetchIcon from "@/assets/image/common/fetch3d.png";
import ShoppingIcon from "@/assets/image/common/shopping.png";
export default {
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      ArrowIcon,
      ShareIcon,
      FetchIcon,
      ShoppingIcon,
      expand: false,
      kinds: [{ items: [{}] }, { items: [{}] }],
    };
  },
  mounted() {},
  methods: {
    expandFirst() {
      this.expand = !this.expand;
    },
    expandSecondary(index) {
      this.$set(this.kinds[index], "expand", !this.kinds[index].expand);
    },
  },
};
</script>
<style lang="scss" scoped>
.work-item-wrap {
  background-color: #ffffff;
  margin-bottom: 0.375rem;
  .expand-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
    transition: transform 0.3s;
    &.expand {
      transform: rotate(90deg);
    }
  }
  .work-item {
    display: flex;
    align-items: center;
    padding: 0.625rem 1.25rem 0.625rem 0.5rem;
    .work-avatar {
      height: 6.25rem;
      width: 4rem;
      object-fit: cover;
      margin-right: 0.625rem;
    }
    .work-detail {
      flex: auto;
      display: flex;
      flex-direction: column;
      .title {
        flex: auto;
        font-size: 0.875rem;
        font-family: PingFangSC, PingFangSC-Bold;
        font-weight: 700;
        text-align: left;
        color: #333333;
        min-height: 3.5rem; // TODO
        .status-tag {
          border-radius: 0.375rem;
          margin-right: 0.5rem;
          font-size: 0.75rem;
          padding: 0.125rem 0.25rem;
          font-family: PingFangSC, PingFangSC-Regular;
          text-align: left;
          color: #ffffff;
          &.running {
            background: #99c901;
          }
          &.completed {
            background: #ffcc19;
          }
        }
      }
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.375rem;
        .date {
          font-size: 0.75rem;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #333333;
        }
        .price {
          font-size: 0.875rem;
          font-family: PingFangSC, PingFangSC-Heavy;
          font-weight: 800;
          text-align: right;
          color: #e35d0d;
        }
      }
      .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.75rem;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        .action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .icon {
            width: 0.875rem;
            height: 0.875rem;
            margin-right: 0.375rem;
          }
        }
      }
    }
  }
  .kind-list {
    height: 0;
    transition: all 0.3s;
    overflow: hidden;
    &.visible {
      height: auto;
    }
    font-size: 0.875rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    .price {
      font-size: 0.875rem;
      font-family: PingFang, PingFang-SC;
      color: #e35d0d;
      margin-left: auto;
      &.price-small {
        font-size: 0.8125rem;
      }
    }
    .kind-item {
      border-top: 0.0625rem solid #dedede;
      .kind-title {
        display: flex;
        align-items: center;
        padding: 0.75rem 1.25rem 0.75rem 2rem;
      }
      .secondary-list {
        height: 0;
        transition: all 0.3s;
        overflow: hidden;
        &.visible {
          height: auto;
        }
        background-color: #fafafa;
        .secondary-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1.25rem 0.5rem 3.75rem;
        }
      }
    }
  }
}
</style>
