<template>
  <div class="home-page">
    <div class="home-links">
      <v-button
        text="我要创作"
        type="primary"
        @onClick="navigateCreate"
      ></v-button>
      <v-button
        text="我的作品"
        type="primary"
        @onClick="navigateWorkList"
      ></v-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 跳转
    navigateCreate() {},
    navigateWorkList() {},
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  position: relative;
  height: 100%;
  width: 100%;
  .home-links {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 1.75rem;
    /deep/ .custom-button {
      width: 7.5rem;
      margin: 0 1rem;
    }
  }
}
</style>
