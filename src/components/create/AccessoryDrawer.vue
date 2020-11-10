<template>
  <el-drawer title="" direction="btt" :visible="visible" :with-header="false">
    <div class="info-wrap">
      <i class="el-icon-close" @click="$emit('cancel')"></i>
      <img class="info-img" :src="BgImg" alt="" />
      <div class="info-detail">
        <div class="name">五金光源</div>
        <div class="meta">
          <div class="power">5w</div>
          <div class="price">¥10.00</div>
        </div>
      </div>
    </div>
    <div class="size-select-wrap">
      <div class="title">尺寸</div>
      <div class="size-list">
        <div
          v-for="(size, index) in sizes"
          :key="index"
          class="size-item"
          :class="{ selected: size.selected }"
          @click="toogleSize(index)"
        >
          {{ size.name }}
        </div>
        <div v-if="sizes.length % 3 === 2" style="width: 6.25rem"></div>
      </div>
    </div>
    <div class="confirm-wrap">确定</div>
  </el-drawer>
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
      sizes: [
        { name: "P0001" },
        { name: "P0002" },
        { name: "P0003" },
        { name: "P0004" },
        { name: "P0005" },
      ],
    };
  },
  mounted() {
    this.fetchDetail();
  },
  methods: {
    async fetchDetail() {},
    toogleSize(currentIndex) {
      this.sizes = this.sizes.map((size, index) => {
        size.selected = currentIndex === index;
        return size;
      });
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
