<template>
  <div class="work-item-wrap">
    <div v-loading="loading" class="work-item">
      <img
        v-if="!hideExpandFirst"
        class="expand-icon"
        :class="{ expand: expand }"
        :src="ArrowIcon"
        @click="expandFirst"
      />
      <img
        class="work-avatar"
        :src="computedItem.url"
        @click="$emit('on-click')"
      />
      <div class="work-detail">
        <div class="title">
          <!-- <span v-if="computedItem.status === 0" class="status-tag running"
            >空白</span
          > -->
          <span v-if="computedItem.status === 1" class="status-tag completed"
            >制作中</span
          >
          <span v-if="computedItem.status === 2" class="status-tag completed"
            >已获取</span
          >
          <span>{{ computedItem.title }}</span>
        </div>
        <div class="info">
          <div class="date">{{ computedItem.updated_at }}</div>
          <div class="price">
            {{
              computedItem.total_price
                ? `¥${parseFloat(computedItem.total_price).toFixed(2)}`
                : ""
            }}
          </div>
        </div>
        <div class="actions">
          <div class="action action-buy" @click="navigateShoppingCard">
            <img class="icon" :src="ShoppingIcon" />
            <span>购买</span>
          </div>
          <div class="action action-fetch" @click="showFetchTipDialog = true">
            <img class="icon" :src="FetchIcon" />
            <span>获取3D图纸</span>
          </div>
          <div class="action action-share" @click="navigateShare">
            <img class="icon" :src="ShareIcon" />
            <span>分享海报</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-list" :class="{ visible: expand }">
      <div
        v-for="(detail, index) in computedItem.details || []"
        :key="index"
        class="detail-item"
      >
        <div class="detail-title" :class="{ single: hideExpandFirst }">
          <img
            class="expand-icon"
            :class="{ expand: detail.expand }"
            :src="ArrowIcon"
            @click="expandSecondary(index)"
          />
          <span>{{ detail.category_name }}</span>
          <span class="price">{{
            detail.total_price
              ? `¥${parseFloat(detail.total_price).toFixed(2)}`
              : ""
          }}</span>
        </div>
        <div class="secondary-list" :class="{ visible: detail.expand }">
          <div
            v-for="(item, idx) in detail.products"
            :key="idx"
            class="secondary-item"
            :class="{ single: hideExpandFirst }"
          >
            <span>{{ item.goods_name }}</span>
            <div>
              <span class="quantity">x {{ item.quantity }}</span>
              <span class="price price-small">{{
                item.total_price
                  ? `¥${parseFloat(item.total_price).toFixed(2)}`
                  : ""
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 提示框 -->
    <fetch-tip-dialog
      :visible="showFetchTipDialog"
      @confirm="navigateWorkForm"
      @cancel="showFetchTipDialog = false"
    ></fetch-tip-dialog>
  </div>
</template>
<script>
import ArrowIcon from "@/assets/image/common/arrow.png";
import ShareIcon from "@/assets/image/common/work/share.png";
import FetchIcon from "@/assets/image/common/work/3D.png";
import ShoppingIcon from "@/assets/image/common/work/cart.png";
import FetchTipDialog from "@/components/work/FetchTipDialog.vue";
import { WORK_API } from "@/utils/api.js";
export default {
  components: {
    FetchTipDialog,
  },
  props: {
    basicItem: {
      type: Object,
    },
    detailItem: {
      type: Object,
    },
  },
  data() {
    return {
      ArrowIcon,
      ShareIcon,
      FetchIcon,
      ShoppingIcon,
      loading: false,
      showFetchTipDialog: false,
      expand: false,
      hideExpandFirst: false,
      details: [{ items: [{}] }, { items: [{}] }],
      initDetailItem: "",
    };
  },
  computed: {
    computedItem() {
      return this.initDetailItem || this.basicItem;
    },
  },
  watch: {
    async expand() {
      if (this.expand && !this.initDetailItem) {
        this.loading = true;
        try {
          const res = await WORK_API.getDetail({ id: this.basicItem.id });
          this.initDetailItem = res.data || {};
        } catch (err) {
          this.$alert(err.message);
        }
        this.loading = false;
      }
    },
    detailItem() {
      this.initDetailItem = this.detailItem || "";
      if (this.initDetailItem) {
        this.expand = true;
        this.hideExpandFirst = true;
      }
    },
  },
  methods: {
    expandFirst() {
      this.expand = !this.expand;
    },
    expandSecondary(index) {
      this.$set(
        this.initDetailItem.details[index],
        "expand",
        !this.initDetailItem.details[index].expand
      );
    },
    navigateShare() {
      this.$router.push({ path: `/work-share/${this.basicItem.id}` });
    },
    navigateWorkForm() {
      this.$router.push({ path: `/work-form/${this.basicItem.id}` });
    },
    navigateShoppingCard() {
      this.$router.push({ path: `/shopping-cart/${this.basicItem.id}` });
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
      margin-left: 0.25rem;
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
  .detail-list {
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
    .quantity {
      font-size: 0.8125rem;
      font-family: PingFangSC, PingFangSC-Regular;
      text-align: left;
      color: #666666;
      line-height: 1.125rem;
    }
    .price {
      font-size: 0.875rem;
      font-family: PingFang, PingFang-SC;
      color: #e35d0d;
      margin-left: auto;
      &.price-small {
        font-size: 0.8125rem;
        display: inline-block;
        width: 5rem;
        text-align: right;
      }
    }
    .detail-item {
      border-top: 0.0625rem solid #dedede;
      .detail-title {
        display: flex;
        align-items: center;
        padding: 0.75rem 1.25rem 0.75rem 2rem;
        &.single {
          padding-left: 0.5rem;
        }
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
          &.single {
            padding-left: 2.25rem;
          }
        }
      }
    }
  }
}
</style>
