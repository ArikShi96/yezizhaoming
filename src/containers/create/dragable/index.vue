<template>
  <v-draggable-resizable-rotatable>
    <div
      class="custom-draggble-img"
      :style="{ backgroundImage: 'url(' + img + ')' }"
    >
      <img
        class="action-icon delete"
        :src="DeleteIcon"
        @touchstart.prevent.stop="$emit('on-delete', index)"
      />
      <img
        class="action-icon lock"
        :src="LockIcon"
        @touchstart.prevent.stop="$emit('on-lock', index)"
      />
      <img
        class="action-icon plus"
        :src="PlusIcon"
        @touchstart.prevent.stop="$emit('on-add', index)"
      />
    </div>
  </v-draggable-resizable-rotatable>
</template>
<script>
import DeleteIcon from "@/assets/image/common/draggable/delete.png";
import LockIcon from "@/assets/image/common/draggable/lock.png";
import PlusIcon from "@/assets/image/common/draggable/plus.png";
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
    },
  },
  data() {
    return {
      DeleteIcon,
      LockIcon,
      PlusIcon,
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
