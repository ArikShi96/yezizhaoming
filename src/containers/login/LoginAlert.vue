<template>
  <div class="alert-page" v-loading="loading">
    <div v-html="content"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      content: "",
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const res = await axios.get("/api/user/agreement");
      this.content = res.data.data.user_agreement;
    } catch (err) {
      this.$alert(err.message);
    }
    this.loading = false;
  },
};
</script>
<style lang="scss" scoped>
.alert-page {
  padding: 0.625rem 1.25rem;
  min-height: 100vh;
}
</style>
