<template>
  <el-drawer
    v-loading="loading"
    title=""
    direction="btt"
    :visible="visible"
    :with-header="false"
  >
    <div class="info-wrap">
      <i class="el-icon-close" @click="$emit('cancel')"></i>
      <img class="info-img" :src="currentItem.img" alt="" />
      <div class="info-detail">
        <div class="name">{{ currentItem.name }}</div>
        <div class="meta">
          <div class="power">{{ calculateLabel }}</div>
          <div class="price">¥{{ calculatePrice }}</div>
        </div>
      </div>
    </div>
    <div class="size-select-wraps">
      <div
        v-for="spec in Object.values(detailStock.specs || {})"
        :key="spec.id"
        class="size-select-wrap"
      >
        <div class="title">{{ spec.label }}</div>
        <div class="size-list">
          <div
            v-for="(size, index) in spec.list || []"
            :key="index"
            class="size-item"
            :class="{
              selected:
                selectedSpec[spec.label_key] &&
                selectedSpec[spec.label_key].id === size.id,
            }"
            @click="toogleSize(spec.label_key, size)"
          >
            {{ size.alias }}
          </div>
          <div
            v-if="(spec.list || []).length % 3 === 2"
            style="width: 6.25rem"
          ></div>
        </div>
      </div>
    </div>
    <div class="confirm-wrap" @click="confirm">确定</div>
  </el-drawer>
</template>
<script>
import { CREATE_API } from "@/utils/api.js";
export default {
  props: {
    visible: {
      type: Boolean,
    },
    currentItem: {
      type: Object,
    },
    c_id: {},
  },
  data() {
    return {
      loading: false,
      detailStock: {},
      selectedSpec: {}, // {label_key: id}
    };
  },
  computed: {
    calculateLabel() {
      return Object.values(this.selectedSpec || {})
        .map((size) => {
          return size.value;
        })
        .join(",");
    },
    calculatePrice() {
      const id = Object.values(this.selectedSpec || {})
        .map((size) => {
          return size.id;
        })
        .join("-");
      return this.detailStock.stores && this.detailStock.stores[id]
        ? this.detailStock.stores[id].price
        : "";
    },
  },
  watch: {
    visible() {
      if (this.visible) {
        this.fetchDetail();
      }
    },
  },
  methods: {
    async fetchDetail() {
      this.loading = true;
      try {
        const res = await CREATE_API.storeStock({
          id: this.currentItem.id,
          c_id: this.c_id,
        });
        this.detailStock = res.data || {};
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    },
    toogleSize(label_key, size) {
      this.$set(this.selectedSpec, [label_key], size);
    },
    confirm() {
      const id = Object.values(this.selectedSpec || {})
        .map((size) => {
          return size.id;
        })
        .join("-");
      const store =
        (this.detailStock.stores && this.detailStock.stores[id]) || {};
      this.$emit(
        "confirm",
        JSON.parse(
          JSON.stringify({ ...this.currentItem, selectedStore: store })
        )
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.info-wrap {
  display: flex;
  position: relative;
  padding: 0.75rem;
  padding-left: 1rem;
  border-bottom: 0.0625rem solid #efefef;
  .el-icon-close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    font-size: 1.125rem;
    color: #cfcfcf;
    font-weight: bold;
  }
  .info-img {
    width: 6.625rem;
    height: 6.625rem;
    object-fit: cover;
    margin-right: 0.75rem;
  }
  .info-detail {
    flex: auto;
    .name {
      padding: 1.75rem 0 2.25rem 0;
      font-size: 0.875rem;
      font-family: PingFang, PingFang-SC;
      color: #333333;
    }
    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.875rem;
      .power {
        font-family: PingFangSC, PingFangSC-Regular;
        color: #999999;
      }
      .price {
        font-family: PingFangSC, PingFangSC-Heavy;
        font-weight: 800;
        color: #ff6602;
      }
    }
  }
}
.size-select-wraps {
  height: 10rem;
  overflow: auto;
}
.size-select-wrap {
  padding: 0.875rem;
  padding-left: 1rem;
  .title {
    font-size: 0.875rem;
    font-family: PingFang, PingFang-SC;
    color: #333333;
    margin-bottom: 1.25rem;
  }
  .size-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .size-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 6.25rem;
      height: 1.875rem;
      background: #ebebeb;
      border-radius: 0.125rem;
      font-size: 0.875rem;
      font-family: PingFang, PingFang-SC;
      color: #333333;
      margin-bottom: 0.75rem;
      &.selected {
        background: #99c901;
        color: #ffffff;
      }
    }
  }
}
.confirm-wrap {
  padding: 0.625rem;
  background: #99c901;
  text-align: center;
  font-size: 1.125rem;
  font-family: PingFangSC, PingFangSC-Regular;
  text-align: center;
  color: #ffffff;
}
</style>
