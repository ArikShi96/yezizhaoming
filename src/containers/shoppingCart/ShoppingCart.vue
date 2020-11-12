<template>
  <div class="shopping-cart-page">
    <div class="mode-wrap" @click="editMode = !editMode">
      {{ editMode ? "完成" : "管理" }}
    </div>
    <div v-for="(cart, index) in carts" :key="index" class="cart-item">
      <div class="cart-title">
        <v-radio class="radio-wrap" :checked="cart.checked" />
        <img
          class="expand-icon"
          :class="{ expand: cart.expand }"
          :src="ArrowIcon"
          @click="expandCart(index)"
        />
        <span>台灯(1)</span>
        <span class="price">¥345.56</span>
      </div>
      <div class="secondary-list" :class="{ visible: cart.expand }">
        <div
          v-for="(item, idx) in cart.items"
          :key="idx"
          class="secondary-item"
        >
          <v-radio
            class="radio-wrap"
            v-if="cart.expand"
            :checked="item.checked"
          />
          <span>台灯(1)</span>
          <span class="price price-small">¥345.56</span>
        </div>
      </div>
    </div>
    <div class="customer-icon-wrap">
      <img class="customer-icon" :src="ServiceIcon" alt="" />
      <span>客服</span>
    </div>
    <div class="checkout-wrap">
      <div class="checkout-info">
        <v-radio
          class="radio-wrap"
          :checked="checkoutAll"
          @on-click="checkoutAll = !checkoutAll"
        ></v-radio>
        <div>全选</div>
        <div class="tip" v-if="!editMode">合计 :</div>
        <div class="price" v-if="!editMode">{{ `￥${totalPrice}` }}</div>
      </div>
      <div v-if="editMode" class="checkout-action delete" @click="submitList">
        删除
      </div>
      <div v-else class="checkout-action" @click="submitList">结算</div>
    </div>
  </div>
</template>
<script>
import ArrowIcon from "@/assets/image/common/arrow.png";
import ServiceIcon from "@/assets/image/common/shopping/service.png";
export default {
  data() {
    return {
      ArrowIcon,
      ServiceIcon,
      carts: [{ items: [{}] }, { items: [{}] }],
      editMode: false,
      checkoutAll: false,
      totalPrice: "10.00",
    };
  },
  watch: {
    checkoutAll() {},
  },
  methods: {
    expandCart(index) {
      this.$set(this.carts[index], "expand", !this.carts[index].expand);
    },
    // 删除||结算
    submitList() {},
  },
};
</script>
<style lang="scss" scoped>
.shopping-cart-page {
  min-height: 100%;
  background-color: #ededed;
  position: relative;
  .expand-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
    transition: transform 0.3s;
    &.expand {
      transform: rotate(90deg);
    }
  }
  .price {
    font-size: 0.875rem;
    font-family: PingFang, PingFang-SC;
    color: #e35d0d;
    margin-left: auto;
    &.price-small {
      font-size: 0.8125rem;
    }
  }
  .mode-wrap {
    font-size: 0.875rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #333333;
    padding: 1.25rem 1.25rem 0.5rem;
  }
  .cart-item {
    background-color: #ffffff;
    border-bottom: 0.0625rem solid #dedede;
    font-size: 0.875rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    .cart-title {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0.75rem 1.25rem 0.75rem 2rem;
      .radio-wrap {
        position: absolute;
        left: 0.625rem;
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
        .radio-wrap {
          position: absolute;
          left: 2.25rem;
        }
      }
    }
  }
  .customer-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    right: 0;
    bottom: 5.625rem;
    width: 4rem;
    height: 2rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 6.25rem 0rem 0rem 6.25rem;
    font-size: 0.875rem;
    font-family: PingFangSC, PingFangSC-Regular;
    color: #ffffff;
    .customer-icon {
      height: 1rem;
      width: 1rem;
    }
  }
  .checkout-wrap {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 3.125rem;
    background-color: #ffffff;
    .checkout-info {
      width: 70%;
      display: flex;
      align-items: center;
      padding-left: 0.625rem;
      font-size: 0.875rem;
      font-family: PingFangSC, PingFangSC-Regular;
      color: #333333;
      .radio-wrap {
        margin-right: 0.5rem;
      }
      .tip {
        margin-left: 1rem;
        font-size: 0.875rem;
        font-family: PingFangSC, PingFangSC-Regular;
        color: #666666;
      }
      .price {
        font-size: 1rem;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: #e35d0d;
        margin-left: 0;
      }
    }
    .checkout-action {
      width: 30%;
      background: #99c901;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #ffffff;
      &.delete {
        background: #f32f16;
      }
    }
  }
}
</style>
