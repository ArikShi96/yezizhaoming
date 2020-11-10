<template>
  <div v-if="visible" class="system-template-list">
    <img
      v-for="(template, index) in templates"
      :key="index"
      class="template-item"
      :src="template"
      @click="handleClick(index)"
    />
  </div>
</template>
<script>
import BgImg from "@/assets/image/test/bg.jpg";
import BgImg2 from "@/assets/image/test/bg2.png";
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      templates: [],
    };
  },
  mounted() {
    this.fetchTemplateList();
  },
  methods: {
    async fetchTemplateList() {
      this.templates = [BgImg, BgImg2, BgImg, BgImg2, BgImg, BgImg2];
    },
    handleClick() {},
  },
};
</script>
<style lang="scss" scoped>
.system-template-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.625rem;
  .template-item {
    width: 32%;
    height: 10.625rem;
    margin-bottom: 0.625rem;
  }
}
</style>
