<template>
  <div></div>
</template>
<script>
import store from "@/utils/store.js";
export default {
  // <body><iframe src="http://localhost:8080/#/template?id=4"></iframe></body>
  async mounted() {
    if (this.$route.query.id) {
      store.clearAll();
      store.setWorkId(this.$route.query.id);
      store.setWorkName(this.$route.query.title || "模板");
      this.$router.push({ path: `/create/work` });
    } else {
      store.clearAll();
      this.$router.push({ path: "/create/image-select" });
    }
  },
};
</script>
<style lang="scss" scoped></style>
