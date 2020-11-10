<template>
  <div class="create-page">
    <!-- 选择背景图片 -->
    <image-select-dialog
      :visible="showImageSelectDialog"
      @cancel="showImageSelectDialog = false"
    ></image-select-dialog>
    <!-- 系统图库/预览 -->
    <system-image-list :visible="showSystemImageList"></system-image-list>
    <system-image-preview
      :visible="showSystemImagePreview"
    ></system-image-preview>
    <!-- 系统模板/预览 -->
    <system-template-list
      :visible="showSystemTemplateList"
    ></system-template-list>
    <system-template-preview
      :visible="showSystemTemplatePreview"
    ></system-template-preview>
    <!-- 输入作品名称 -->
    <name-input-dialog
      :visible="showNameInputDialog"
      @cancel="showNameInputDialog = false"
      @input-work-name="inputWorkName"
    ></name-input-dialog>
    <!-- 选择灯型 -->
    <type-select-list :visible="showTypeSelectList"></type-select-list>
    <!-- 创作过程 -->
    <create-work :visible="showCreateWork"></create-work>
    <!-- 更多选择 -->
    <more-selection :visible="showMoreSelection"></more-selection>
    <!-- 配件弹窗 -->
    <accessory-drawer
      :visible="showAccessoryDrawer"
      @cancel="showAccessoryDrawer = false"
    ></accessory-drawer>
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
// 选择背景图片
import ImageSelectDialog from "@/components/create/dialog/ImageSelectDialog.vue";
// 系统图库/预览
import SystemImageList from "@/components/create/SystemImageList.vue";
import SystemImagePreview from "@/components/create/SystemImagePreview.vue";
// 系统模板/预览
import SystemTemplateList from "@/components/create/SystemTemplateList.vue";
import SystemTemplatePreview from "@/components/create/SystemTemplatePreview.vue";
// 输入作品名称
import NameInputDialog from "@/components/create/dialog/NameInputDialog.vue";
// 选择灯型
import TypeSelectList from "@/components/create/TypeSelectList.vue";
// 创作过程
import CreateWork from "@/components/create/CreateWork.vue";
// 更多选择
import MoreSelection from "@/components/create/MoreSelection.vue";
// 配件弹窗
import AccessoryDrawer from "@/components/create/AccessoryDrawer.vue";
// 关注二维码
import QrCodeDialog from "@/components/create/dialog/QrCodeDialog.vue";
import CancelWorkDialog from "@/components/create/dialog/CancelWorkDialog.vue";
import ConfirmWorkDialog from "@/components/create/dialog/ConfirmWorkDialog.vue";
export default {
  components: {
    // 选择背景图片
    ImageSelectDialog,
    // 系统图库/预览
    SystemImageList,
    SystemImagePreview,
    // 系统模板/预览
    SystemTemplateList,
    SystemTemplatePreview,
    // 输入作品名称
    NameInputDialog,
    // 选择灯型
    TypeSelectList,
    // 创作过程
    CreateWork,
    // 更多选择
    MoreSelection,
    // 配件弹窗
    AccessoryDrawer,
    // 关注二维码
    QrCodeDialog,
    CancelWorkDialog,
    ConfirmWorkDialog,
  },
  data() {
    return {
      // 选择背景图片
      showImageSelectDialog: false,
      // 系统图库/预览
      showSystemImageList: false,
      showSystemImagePreview: false,
      // 系统模板/预览
      showSystemTemplateList: false,
      showSystemTemplatePreview: false,
      // 输入作品名称
      showNameInputDialog: false,
      // 选择灯型
      showTypeSelectList: false,
      // 创作过程
      showCreateWork: true,
      // 更多选择
      showMoreSelection: false,
      // 配件弹窗
      showAccessoryDrawer: false,
      // 关注二维码
      showQrCodeDialog: false,
      // 保存/取消作品
      showCancelWorkDialog: false,
      showConfirmWorkDialog: false,
    };
  },
  methods: {
    // 选择背景图片
    // 系统图库/预览
    // 系统模板/预览
    // 输入作品名称
    inputWorkName(workName) {},
    // 选择灯型
    // 创作过程
    // 更多选择
    // 配件弹窗
    // 关注二维码
    // 保存/取消作品
    async saveWork() {},
    cancelWork() {},
  },
};
</script>
<style lang="scss" scoped>
.create-page {
  min-height: 100%;
}
</style>
