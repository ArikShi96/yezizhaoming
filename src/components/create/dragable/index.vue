<template>
  <v-draggable-resizable-rotatable>
    <img class="draggable-img" :src="img" />
  </v-draggable-resizable-rotatable>
</template>
<script>
export default {
  props: {
    img: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.draggable-img {
  height: 100%;
  width: 100%;
}
</style>
