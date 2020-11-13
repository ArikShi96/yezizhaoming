<template>
  <div class="create-page">
    <!-- 选择背景图片 -->
    <image-select-dialog
      :visible="showImageSelectDialog"
      @cancel="$router.push({ path: '/' })"
      @confirm="selectBackgroundImage"
    ></image-select-dialog>
    <!-- 系统图库/预览 -->
    <system-image-list
      :visible="showSystemImageList"
      @confirm="viewSystemDetail"
    ></system-image-list>
    <system-image-preview
      :visible="showSystemImagePreview"
      :current-image-id="currentSystemImageId"
      @cancel="backSystemList"
      @confirm="onSystemChoose"
    ></system-image-preview>
    <!-- 系统模板/预览 -->
    <system-template-list
      :visible="showSystemTemplateList"
      :current-template-id="currentsystemTemplateId"
      @confirm="viewTemplateDetail"
    ></system-template-list>
    <system-template-preview
      :visible="showSystemTemplatePreview"
      @cancel="backTemplateList"
      @confirm="onTemplateChoose"
    ></system-template-preview>
    <!-- 输入作品名称 -->
    <name-input-dialog
      :visible="showNameInputDialog"
      @cancel="$router.push({ path: '/' })"
      @input-work-name="inputWorkName"
    ></name-input-dialog>
    <!-- 选择灯型 -->
    <type-select-list :visible="showTypeSelectList"></type-select-list>
    <!-- 创作过程 -->
    <create-work :visible="showCreateWork"></create-work>
    <!-- 更换背景图片 -->
    <image-select-dialog
      :visible="showImageSwitchDialog"
      @cancel="showImageSwitchDialog = false"
      @confirm="selectBackgroundImage"
    ></image-select-dialog>
    <!-- 更多选择 -->
    <more-selection :visible="showMoreSelection"></more-selection>
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
// 关注二维码
import QrCodeDialog from "@/components/create/dialog/QrCodeDialog.vue";
import CancelWorkDialog from "@/components/create/dialog/CancelWorkDialog.vue";
import ConfirmWorkDialog from "@/components/create/dialog/ConfirmWorkDialog.vue";
import BackWorkDialog from "@/components/create/dialog/BackWorkDialog.vue";
import store from "@/utils/store.js";
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
    // 关注二维码
    QrCodeDialog,
    CancelWorkDialog,
    ConfirmWorkDialog,
  },
  data() {
    return {
      // 选择背景图片 更换背景图片
      showImageSelectDialog: false,
      showImageSwitchDialog: false,
      currentBackground: "",
      // 系统图库/预览
      currentSystemImageId: "",
      currentSystemImage: "",
      showSystemImageList: false,
      showSystemImagePreview: false,
      // 系统模板/预览
      currentsystemTemplateId: "",
      currentsystemTemplate: "",
      showSystemTemplateList: false,
      showSystemTemplatePreview: false,
      // 输入作品名称
      showNameInputDialog: false,
      // 选择灯型
      showTypeSelectList: false,
      // 创作过程
      showCreateWork: false,
      // 更多选择
      showMoreSelection: false,
      // 关注二维码
      showQrCodeDialog: false,
      // 保存/取消作品
      showCancelWorkDialog: false,
      showConfirmWorkDialog: false,
    };
  },
  mounted() {
    store.cleatAll();
    this.showImageSelectDialog = true;
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("确定离开创作界面吗?");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  methods: {
    // 选择背景图片
    selectBackgroundImage(type) {
      this.showImageSelectDialog = false;
      switch (type) {
        case 0: {
          this.showSystemImageList = true;
          break;
        }
        case 1: {
          this.showSystemTemplateList = true;
          break;
        }
        case 2: {
          this.showNameInputDialog = true;
          break;
        }
        default: {
          break;
        }
      }
    },
    // 系统图库/预览
    viewSystemDetail(currentSystemImageId) {
      this.currentSystemImageId = currentSystemImageId;
      this.showSystemImageList = false;
      this.showSystemImagePreview = true;
    },
    backSystemList() {
      this.showSystemImagePreview = false;
      this.showSystemImageList = true;
    },
    onSystemChoose() {
      this.showSystemImagePreview = false;
      this.showNameInputDialog = true;
    },
    // 系统模板/预览
    viewTemplateDetail(currentsystemTemplateId) {
      this.currentsystemTemplateId = currentsystemTemplateId;
      this.showSystemTemplateList = false;
      this.showSystemTemplatePreview = true;
    },
    backTemplateList() {
      this.showSystemTemplatePreview = false;
      this.showSystemTemplateList = true;
    },
    onTemplateChoose() {
      this.showSystemTemplatePreview = false;
      this.showNameInputDialog = true;
    },
    // 输入作品名称
    inputWorkName(workName) {
      this.showNameInputDialog = false;
      this.showTypeSelectList = true;
    },
    // 选择灯型
    chooseType() {
      this.showTypeSelectList = false;
      this.showCreateWork = true;
    },
    // 创作过程
    addMoreSelect() {},
    switchBackground() {},
    // 更多选择
    chooseMoreSelect() {},
    // 关注二维码
    showQrDialog() {},
    hideQrDialog() {},
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
