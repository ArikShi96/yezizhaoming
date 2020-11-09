<template>
  <div class="create-page">
    <!-- 选择背景图片 -->
    <image-select-dialog
      :visible="showImageSelectDialog"
      @cancel="showImageSelectDialog = false"
    ></image-select-dialog>
    <!-- 输入作品名称 -->
    <name-input-dialog
      :visible="showNameInputDialog"
      @cancel="showNameInputDialog = false"
      @input-work-name="inputWorkName"
    ></name-input-dialog>
    <!-- 关注二维码 -->
    <qr-code-dialog
      :visible="showQrCodeDialog"
      @cancel="showQrCodeDialog = false"
    ></qr-code-dialog>
    <!-- 保存/取消作品 -->
    <cancel-work-dialog
      :visible="showCancelWorkDialog"
      @cancel="showCancelWorkDialog = false"
      @cancel-work="cancelWork"
    ></cancel-work-dialog>
    <confirm-work-dialog
      :visible="showConfirmWorkDialog"
      @cancel="showConfirmWorkDialog = false"
      @save-work="saveWork"
    ></confirm-work-dialog>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import ImageSelectDialog from "@/components/create/dialog/ImageSelectDialog.vue";
import NameInputDialog from "@/components/create/dialog/NameInputDialog.vue";
import QrCodeDialog from "@/components/create/dialog/QrCodeDialog.vue";
import CancelWorkDialog from "@/components/create/dialog/CancelWorkDialog.vue";
import ConfirmWorkDialog from "@/components/create/dialog/ConfirmWorkDialog.vue";
export default {
  components: {
    ImageSelectDialog,
    NameInputDialog,
    QrCodeDialog,
    CancelWorkDialog,
    ConfirmWorkDialog,
  },
  data() {
    return {
      // 选择背景图片
      showImageSelectDialog: false,
      // 输入作品名称
      showNameInputDialog: false,
      // 关注二维码
      showQrCodeDialog: false,
      // 保存/取消作品
      showCancelWorkDialog: false,
      showConfirmWorkDialog: false,
    };
  },
  methods: {
    // 选择背景图片
    // 输入作品名称
    inputWorkName(workName) {},
    // 关注二维码
    // 保存/取消作品
    async saveWork() {},
    cancelWork() {},
  },
};
</script>
<style lang="scss" scoped></style>
