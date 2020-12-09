<template>
  <div class="create-work-page" v-loading="loading">
    <more-selection
      :visible="showMoreSelection"
      :allTabs="allTabs || []"
      @cancel="showMoreSelection = false"
      @select-item="selectItem"
    ></more-selection>
    <div v-if="!showMoreSelection" class="create-work-wrap">
      <!-- 背景图 -->
      <img
        v-if="formData.backgroundImage.url"
        class="bg-img"
        :src="formData.backgroundImage.url"
        alt=""
      />
      <!-- 操作按钮 -->
      <img class="back-icon" :src="BackIcon" alt="" @click="handleCancel" />
      <div class="add-type" @click="showConfirmWorkDialog = true">
        <img class="icon" :src="AddIcon" alt="" /> 添加灯型
      </div>
      <div class="switch-theme" @click="navigateChangeBg">
        <img class="icon" :src="RefreshIcon" alt="" /> 切换场景
      </div>
      <!-- 所有编辑部件 -->
      <div class="drag-list" ref="drags" style="height: 100vh">
        <v-draggable-resizable-rotatable
          v-for="(item, index) in formData.workList"
          :key="index"
          :class="{ 'hide-rotate': item.unionId }"
          v-show="showSelf(item)"
          :w="(item.meta || {}).width || 100"
          :h="(item.meta || {}).height || 100"
          :x="(item.meta || {}).offsetX || 0"
          :y="(item.meta || {}).offsetY || 0"
          :r="(item.meta || {}).rotate || 0"
          :lock-aspect-ratio="true"
          @dragging="onDraging(item)"
          @dragstop="onDragStop"
          @resizing="onResizing(item)"
          @resizestop="onResizstop"
          @rotating="onRotating(item)"
          @rotatestop="onRotateStop"
        >
          <div v-if="isIframe" class="custom-draggble-img">
            <img class="draggble-bg-img" :src="item.img" alt="" />
            <img
              class="action-icon delete"
              :src="DeleteIcon"
              @click.stop="handleDelete(index)"
            />
            <img
              class="action-icon lock"
              :src="item.unionId ? UnLockIcon : LockIcon"
              @click.stop="handleLock(index)"
            />
            <img
              v-if="!item.unionId"
              class="action-icon plus"
              :src="PlusIcon"
              @click.stop="handleAdd(index)"
            />
          </div>
          <div v-else class="custom-draggble-img">
            <img class="draggble-bg-img" :src="item.img" alt="" />
            <img
              class="action-icon delete"
              :src="DeleteIcon"
              @touchstart.prevent.stop="handleDelete(index)"
            />
            <img
              class="action-icon lock"
              :src="item.unionId ? UnLockIcon : LockIcon"
              @touchstart.prevent.stop="handleLock(index)"
            />
            <img
              v-if="!item.unionId"
              class="action-icon plus"
              :src="PlusIcon"
              @touchstart.prevent.stop="handleAdd(index)"
            />
          </div>
        </v-draggable-resizable-rotatable>
      </div>
      <!-- 底部弹出 -->
      <div class="expand-wrap">
        <div class="expand-icon-wrap" :class="{ visible: expand }">
          <div class="expand-icon" @click="toogleExpand">
            <span>{{ expand ? "隐藏" : "展开" }}</span>
            <i class="el-icon-d-arrow-left"></i>
          </div>
        </div>
        <div class="scroll-list" :class="{ visible: expand }">
          <div class="scroll-tabs">
            <div class="scroll-tab more" @click="showMoreSelectionWrap">
              <span>更多</span>
              <span class="new-tag">New</span>
            </div>
            <div
              v-for="(tab, index) in allTabs || []"
              :key="index"
              class="scroll-tab"
              :class="{ selected: tab.selected }"
              @click="selectTab(index)"
            >
              {{ tab.name }}
            </div>
          </div>
          <div class="scroll-items">
            <div
              v-for="(item, index) in scrollItems"
              :key="index"
              class="scroll-item"
              :class="{ selected: item.selected }"
              :style="{ backgroundImage: 'url(' + item.img + ')' }"
              @click="selectItem(item)"
            >
              <div class="item-name">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 操作 -->
      <div class="create-work-actions">
        <v-button text="取消" type="gray" @onClick="handleCancel"></v-button>
        <v-button text="完成" type="primary" @onClick="submitWork"></v-button>
      </div>
    </div>
    <!-- 配件弹窗 -->
    <accessory-drawer
      :visible="showAccessoryDrawer"
      :current-item="accessoryDrawerItem"
      :c_id="currentCId"
      @cancel="showAccessoryDrawer = false"
      @confirm="confirmItemSelect"
    ></accessory-drawer>
    <!-- 保存/取消作品 -->
    <return-detail-dialog
      :visible="shoReturnDetailDialog"
      @cancel="shoReturnDetailDialog = false"
      @confirm="navigateDetail"
    ></return-detail-dialog>
    <cancel-work-dialog
      :visible="showCancelWorkDialog"
      @cancel="showCancelWorkDialog = false"
      @confirm="navigateTypeSelect"
    ></cancel-work-dialog>
    <confirm-work-dialog
      :visible="showConfirmWorkDialog"
      @cancel="showConfirmWorkDialog = false"
      @confirm="navigateAddType"
    ></confirm-work-dialog>
  </div>
</template>
<script>
import DeleteIcon from "@/assets/image/common/draggable/delete.png";
import LockIcon from "@/assets/image/common/draggable/lock.png";
import UnLockIcon from "@/assets/image/common/draggable/unlock.png";
import PlusIcon from "@/assets/image/common/draggable/plus.png";
import AddIcon from "@/assets/image/common/add.png";
import BackIcon from "@/assets/image/common/back.png";
import RefreshIcon from "@/assets/image/common/refresh.png";
// 配件弹窗
import MoreSelection from "@/containers/create/MoreSelection.vue";
import AccessoryDrawer from "@/containers/create/AccessoryDrawer.vue";
import ReturnDetailDialog from "@/containers/create/dialog/ReturnDetailDialog.vue";
import CancelWorkDialog from "@/containers/create/dialog/CancelWorkDialog.vue";
import ConfirmWorkDialog from "@/containers/create/dialog/ConfirmWorkDialog.vue";
import { CREATE_API, UPLOAD_API, WORK_API } from "@/utils/api.js";
import store from "@/utils/store.js";
// import html2canvas from "html2canvas";
import * as util from "@/utils/util.js";
// import html2canvas from "@/assets/js/html2canvas.js";
import domtoimage from "dom-to-image";
export default {
  components: {
    MoreSelection,
    // 配件弹窗
    AccessoryDrawer,
    CancelWorkDialog,
    ConfirmWorkDialog,
    ReturnDetailDialog,
  },
  data() {
    return {
      isIframe: util.isIframe(),
      currentWorkId: "",
      currentWorkName: "",
      loading: false,
      shoReturnDetailDialog: false,
      showCancelWorkDialog: false,
      showConfirmWorkDialog: false,
      showMoreSelection: false,
      showAccessoryDrawer: false, // 配件弹窗
      accessoryDrawerItem: {},
      expand: false,
      AddIcon,
      BackIcon,
      RefreshIcon,
      DeleteIcon,
      LockIcon,
      UnLockIcon,
      PlusIcon,
      allTabs: [],
      allTabMap: {},
      // 创作内容
      formData: {
        backgroundImage: {},
        workList: [
          // {
          //   meta: {
          //     offsetX: 0,
          //     offsetY: 0,
          //     width: 100,
          //     height: 100,
          //     rotate: 0,
          //   },
          //   img:
          //     "https://dengshi.yuejike.com/storage/backend/images/47823d1680d3739fdd33b6ddfb7d280.jpg",
          // },
        ],
      },
      currentSelect: "",
      isUnLockMode: false,
      currentLockUnion: 0,
    };
  },
  computed: {
    scrollItems() {
      const selectedTab = this.allTabs.find((tab) => {
        return tab.selected;
      }) || { id: "" };
      return this.allTabMap[selectedTab.id] || [];
    },
    currentCId() {
      const selectedTab = this.allTabs.find((tab) => {
        return tab.selected;
      }) || { id: "" };
      return selectedTab.id;
    },
  },
  async mounted() {
    this.currentWorkId = store.getWorkId();
    this.currentWorkName = store.getWorkName();
    this.fetchAllTabs();
    const initFormData = store.getWorkData();
    let replacedBackground = store.getBackgroundImage();
    if (initFormData) {
      this.formData = JSON.parse(initFormData);
    } else if (this.currentWorkId) {
      this.loading = true;
      try {
        const res = await WORK_API.getDetail({ id: this.currentWorkId });
        this.currentWorkName = res.data.title;
        const formData = JSON.parse(res.data.data || "{}");
        const originWidth = formData.innerWidth || window.innerWidth;
        const originHeight = formData.innerHeight || window.innerHeight;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        const offWidth = innerWidth / originWidth;
        const offHeight = innerHeight / originHeight;
        this.formData = formData;
        this.formData.workList.forEach((item) => {
          item.meta.offsetX = parseInt(item.meta.offsetX * offWidth);
          item.meta.offsetY = parseInt(item.meta.offsetY * offHeight);
          item.meta.width = parseInt(item.meta.width * offWidth);
          item.meta.height = parseInt(item.meta.height * offWidth);
        });
      } catch (err) {
        this.$alert(err.message);
      }
      this.loading = false;
    }
    if (replacedBackground) {
      replacedBackground = JSON.parse(replacedBackground);
      if (replacedBackground.type + "" === "1") {
        this.loading = true;
        try {
          const res = await WORK_API.getTplDetail({
            id: replacedBackground.id,
          });
          const formData = JSON.parse(res.data.data || "{}");
          const originWidth = formData.innerWidth || window.innerWidth;
          const originHeight = formData.innerHeight || window.innerHeight;
          const innerWidth = window.innerWidth;
          const innerHeight = window.innerHeight;
          const offWidth = innerWidth / originWidth;
          const offHeight = innerHeight / originHeight;
          this.formData = formData;
          this.formData.workList.forEach((item) => {
            item.meta.offsetX = parseInt(item.meta.offsetX * offWidth);
            item.meta.offsetY = parseInt(item.meta.offsetY * offHeight);
            item.meta.width = parseInt(item.meta.width * offWidth);
            item.meta.height = parseInt(item.meta.height * offWidth);
          });
        } catch (err) {
          this.$alert(err.message);
        }
        this.loading = false;
      } else {
        this.$set(this.formData, "backgroundImage", replacedBackground);
      }
    }
    // 清理localstorage
    store.removeWorkData();
  },
  methods: {
    // 列表操作
    showSelf(item) {
      if (this.isUnLockMode) {
        return item.parentUnionId === this.currentLockUnion;
      } else {
        return !item.parentUnionId;
      }
    },
    handleAdd(index) {
      this.$set(this.formData, "workList", [
        ...this.formData.workList,
        JSON.parse(
          JSON.stringify({
            ...this.formData.workList[index],
            meta: {
              offsetX: 0,
              offsetY: 0,
              width: 100,
              height: 100,
              rotate: 0,
            },
          })
        ),
      ]);
    },
    handleDelete(index) {
      const unionId = this.formData.workList[index].unionId;
      this.formData.workList.splice(index, 1);
      // 联动删除
      if (unionId) {
        const workList = this.formData.workList.filter((item) => {
          return item.parentUnionId !== unionId;
        });
        this.$set(this.formData, "workList", workList);
      }
    },
    async handleLock(index) {
      // 控件有bug
      return Promise.resolve().then(async () => {
        const currentItem = this.formData.workList[index];
        if (currentItem.unionId) {
          // 解锁
          this.isUnLockMode = true;
          this.currentLockUnion = currentItem.unionId;
        } else {
          // 上锁
          const metas = [];
          this.formData.workList.forEach((item) => {
            if (
              item.parentUnionId === currentItem.parentUnionId &&
              !item.unionId
            ) {
              metas.push(item.meta);
            }
          });
          const ranges = util.getRanges(metas);
          const imgRrl = await this.toUnionImage(ranges);
          if (currentItem.parentUnionId) {
            // 重新上锁
            const parent = this.formData.workList.find((item) => {
              return item.unionId === currentItem.parentUnionId;
            });
            parent.img = imgRrl;
            parent.meta = {
              offsetX: ranges[0],
              offsetY: ranges[1],
              width: ranges[2],
              height: ranges[3],
              rotate: 0,
            };
          } else {
            let parentUnionId = 0;
            // 第一次上锁
            this.formData.workList.forEach((item) => {
              if (item.parentUnionId) {
                parentUnionId = item.parentUnionId; // 取最大值 + 1
              }
            });
            parentUnionId += 1;
            this.formData.workList.forEach((item) => {
              if (!item.parentUnionId && !item.unionId) {
                item.parentUnionId = parentUnionId; // 空闲的配件添加 parentUnionId
              }
            });
            this.formData.workList.push({
              type: JSON.parse(
                JSON.stringify(JSON.parse(store.getSelectType()))
              ),
              img: imgRrl,
              unionId: parentUnionId,
              meta: {
                offsetX: ranges[0],
                offsetY: ranges[1],
                width: ranges[2],
                height: ranges[3],
                rotate: 0,
              },
            });
          }
          this.isUnLockMode = false;
          this.currentLockUnion = 0;
        }
      });
    },
    onDraging(item) {
      this.currentSelect = item;
    },
    onResizing(item) {
      this.currentSelect = item;
    },
    onRotating(item) {
      this.currentSelect = item;
    },
    onDragStop(x, y) {
      const offX = x - this.currentSelect.meta.offsetX;
      const offY = y - this.currentSelect.meta.offsetY;
      // console.log(`x: ${x}, y: ${y}`);
      this.currentSelect.meta.offsetX = x;
      this.currentSelect.meta.offsetY = y;
      // 组合动,配件跟着动
      if (this.currentSelect.unionId) {
        this.formData.workList.forEach((workItem) => {
          if (workItem.parentUnionId === this.currentSelect.unionId) {
            workItem.meta.offsetX = workItem.meta.offsetX + offX;
            workItem.meta.offsetY = workItem.meta.offsetY + offY;
          }
        });
      }
    },
    onResizstop(x, y, width, height) {
      // const offX = x - this.currentSelect.meta.offsetX;
      // const offY = y - this.currentSelect.meta.offsetY;
      const offWidth = width / this.currentSelect.meta.width;
      const offHeight = height / this.currentSelect.meta.height;
      // console.log(`width: ${width}, height: ${height}`);
      this.currentSelect.meta.offsetX = x;
      this.currentSelect.meta.offsetY = y;
      this.currentSelect.meta.width = width;
      this.currentSelect.meta.height = height;
      // 组合动,配件跟着动
      if (this.currentSelect.unionId) {
        this.formData.workList.forEach((workItem) => {
          if (workItem.parentUnionId === this.currentSelect.unionId) {
            // workItem.meta.offsetX = workItem.meta.offsetX + offX;
            // workItem.meta.offsetY = workItem.meta.offsetY + offY;
            workItem.meta.width = parseInt(workItem.meta.width * offWidth);
            workItem.meta.height = parseInt(workItem.meta.height * offHeight);
          }
        });
      }
    },
    onRotateStop(rotate) {
      // console.log(`rotate: ${rotate}`);
      this.currentSelect.meta.rotate = rotate;
    },
    // 页面元素转图片
    async toUnionImage(ranges) {
      try {
        // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
        window.document.getElementsByClassName("vdrr").forEach((el) => {
          el.classList.add("canvas");
        });
        this.loading = true;
        await util.sleep(100);
        // await util.waitImagesLoad("draggble-bg-img"); // 等待所有图片onload
        let url = "";
        if (util.isiOS()) {
          url = await domtoimage.toPng(this.$refs.drags);
          url = await domtoimage.toPng(this.$refs.drags); // TODO 两次
          const res = await UPLOAD_API({
            upload_file: this.dataURLtoFile(url, "合成图片.png"),
          });
          url = res.data.url;
        } else {
          url = await domtoimage.toSvg(this.$refs.drags);
        }
        window.document.getElementsByClassName("vdrr").forEach((el) => {
          el.classList.remove("canvas");
        });
        url = await util.toUnionImage(url, ranges);
        // console.log(url);
        const res = await UPLOAD_API({
          upload_file: this.dataURLtoFile(url, "合成图片.png"),
        });
        this.loading = false;
        return res.data.url;
      } catch (err) {
        this.$alert(err.message);
        this.loading = false;
      }
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // 更多选择
    async fetchAllTabs() {
      try {
        const selectedTabs = JSON.parse(store.getSelectType());
        if (!selectedTabs) {
          return;
        }
        const responses = await Promise.all(
          [selectedTabs].map((tab) => {
            return CREATE_API.categories({ parent_id: tab.id });
          })
        );
        responses.forEach((res) => {
          this.allTabs = [...this.allTabs, ...(res.data || [])];
        });
        if (this.allTabs.length) {
          this.fetchTabItems(this.allTabs[0].id);
          this.$set(this.allTabs[0], "selected", true);
        }
      } catch (err) {
        this.$alert(err.message);
      }
    },
    async fetchTabItems(c_id) {
      if (!this.allTabMap[c_id]) {
        try {
          const res = await CREATE_API.storeList({ c_id });
          this.$set(this.allTabMap, c_id, res.data || []);
        } catch (err) {
          this.$alert(err.message);
        }
      }
    },
    // 底部操作
    toogleExpand() {
      // if (this.isUnLockMode) {
      //   this.$alert("当前只允许编辑解锁的配件");
      //   return;
      // }
      this.expand = !this.expand;
    },
    async selectTab(selectedIndex) {
      this.allTabs = this.allTabs.map((tab, index) => {
        tab.selected = selectedIndex === index;
        return tab;
      });
      await this.fetchTabItems(this.allTabs[selectedIndex].id);
    },
    selectItem(item) {
      this.expand = false;
      this.showAccessoryDrawer = true;
      this.accessoryDrawerItem = item;
    },
    showMoreSelectionWrap() {
      this.expand = false;
      this.showMoreSelection = true;
    },
    confirmItemSelect(item) {
      this.showMoreSelection = false;
      this.showAccessoryDrawer = false;
      this.expand = false;
      this.$set(this.formData, "workList", [
        ...this.formData.workList,
        {
          parentUnionId: this.isUnLockMode ? this.currentLockUnion : undefined,
          item,
          meta: { offsetX: 0, offsetY: 0, width: 100, height: 100, rotate: 0 },
          img: item.img,
        },
      ]);
      this.$alert("点击锁定组合当前页面配件并保存");
    },
    // 路由跳转
    async navigateAddType() {
      await this.formData.workList.forEach(async (workItem, index) => {
        if (!workItem.parentUnionId && !workItem.unionId) {
          await this.handleLock(index);
        }
      });
      store.setWorkData(this.formData);
      this.$router.push({ path: "/create/work/add-type" });
    },
    navigateChangeBg() {
      store.setWorkData(this.formData);
      this.$router.push({ path: "/create/work/change-bg" });
    },
    navigateTypeSelect() {
      this.$router.push({ path: "/create/type-select" });
    },
    navigateDetail() {
      this.$router.push({ path: `/work-detail/${this.currentWorkId}` });
    },
    handleCancel() {
      if (this.currentWorkId) {
        this.shoReturnDetailDialog = true;
      } else {
        this.showCancelWorkDialog = true;
      }
    },
    // 提交
    async submitWork() {
      if (!this.formData.workList.length) {
        this.$alert("请选择要保存的配件");
        return;
      }
      if (this.isUnLockMode) {
        this.$alert("请先锁定当前解锁的配件");
        return;
      }
      this.formData.workList.forEach(async (workItem, index) => {
        if (!workItem.parentUnionId && !workItem.unionId) {
          await this.handleLock(index);
        }
      });
      try {
        this.loading = true;
        const url = await this.generateBackground();
        let res = {};
        if (this.currentWorkId) {
          res = await CREATE_API.edit({
            id: this.currentWorkId,
            products: this.generateProducts(),
            title: this.currentWorkName || "作品标题",
            url,
            data: JSON.stringify({
              ...this.formData,
              innerWidth: window.innerWidth,
              innerHeight: window.innerHeight,
            }),
          });
        } else {
          res = await CREATE_API.save({
            products: this.generateProducts(),
            title: store.getWorkName() || "作品标题",
            url,
            data: JSON.stringify({
              ...this.formData,
              innerWidth: window.innerWidth,
              innerHeight: window.innerHeight,
            }),
          });
        }
        this.loading = false;
        this.$alert("保存成功");
        // 跳转
        await util.sleep(500);
        if (util.isIframe()) {
          this.$router.push({ path: "/template/success" });
        } else {
          this.$router.push({ path: `/work-detail/${res.data.id}` });
        }
      } catch (err) {
        this.loading = false;
        this.$alert(err.message);
      }
    },
    generateProducts() {
      const productMap = {}; // {id => quality}
      this.formData.workList.forEach((workItem) => {
        if (workItem && workItem.item && workItem.item.selectedStore) {
          const store = workItem.item.selectedStore;
          if (productMap[store.id]) {
            productMap[store.id] = productMap[store.id] + 1;
          } else {
            productMap[store.id] = 1;
          }
        }
      });
      return Object.keys(productMap).map((key) => {
        return { product_id: key, quantity: productMap[key] };
      });
    },
    async generateBackground() {
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      window.document
        .getElementsByClassName("create-work-wrap")[0]
        .classList.add("hidden");
      window.document
        .getElementsByClassName("vdrr")
        .forEach((el) => el.classList.add("canvas"));
      await util.sleep(100);
      let url = "";
      if (util.isiOS()) {
        url = await domtoimage.toPng(
          document.getElementsByClassName("create-work-wrap")[0]
        );
        url = await domtoimage.toPng(
          document.getElementsByClassName("create-work-wrap")[0]
        ); // TODO 两次
        // const res = await UPLOAD_API({
        //   upload_file: this.dataURLtoFile(url, "合成图片.png"),
        // });
        // url = res.data.url;
      } else {
        url = await domtoimage.toSvg(
          document.getElementsByClassName("create-work-wrap")[0]
        );
        url = await util.toUnionImage(url, [
          0,
          0,
          window.innerWidth,
          window.innerHeight,
        ]);
      }
      window.document
        .getElementsByClassName("vdrr")
        .forEach((el) => el.classList.remove("canvas"));
      window.document
        .getElementsByClassName("create-work-wrap")[0]
        .classList.remove("hidden");
      const res = await UPLOAD_API({
        upload_file: this.dataURLtoFile(url, "背景图片.png"),
      });
      // const img = document.createElement("img");
      // img.src = url;
      // document.body.append(img);
      return res.data.url;
    },
  },
};
</script>
<style lang="scss" scoped>
.create-work-page {
  height: 100vh;
}
.create-work-wrap {
  height: 100%;
  position: relative;
  .bg-img {
    z-index: -1;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }
  &.hidden {
    .back-icon,
    .add-type,
    .switch-theme,
    .expand-wrap,
    .create-work-actions {
      visibility: hidden;
    }
  }
  .back-icon {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 1.625rem;
    height: 1.625rem;
    z-index: 9;
  }
  .add-type,
  .switch-theme {
    z-index: 9;
    position: absolute;
    right: 0.375rem;
    display: flex;
    align-items: center;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.75rem;
    padding: 0.25rem 0.375rem;
    font-size: 0.75rem;
    font-family: PingFangSC, PingFangSC-Medium;
    color: #333333;
    line-height: 1.0625rem;
    letter-spacing: 0rem;
    .icon {
      width: 0.6875rem;
      height: auto;
      margin-right: 0.125rem;
    }
  }
  .add-type {
    top: 0.625rem;
  }
  .switch-theme {
    top: 2.75rem;
  }
  .expand-wrap {
    .expand-icon-wrap {
      position: fixed;
      bottom: 1.7rem; // TODO
      left: 0;
      width: 100%;
      text-align: center;
      transition: bottom 0.5s;
      .expand-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 1rem;
        width: 4.125rem;
        background-color: rgba($color: #000000, $alpha: 0.5);
        border-radius: 6.25rem 6.25rem 0rem 0rem;
        font-size: 0.625rem;
        font-family: PingFangSC, PingFangSC-Regular;
        color: #ffffff;
        .el-icon-d-arrow-left {
          margin-left: 0.25rem;
          transform: rotate(90deg);
          font-size: 0.75rem;
        }
      }
      &.visible {
        bottom: 7.7rem; // TODO
        .el-icon-d-arrow-left {
          transform: rotate(-90deg);
        }
      }
    }
    .scroll-list {
      position: fixed;
      bottom: 1.75rem;
      left: 0;
      width: 100%;
      height: 0;
      overflow-x: auto;
      overflow-y: hidden;
      transition: height 0.5s;
      background-color: rgba($color: #000000, $alpha: 0.5);
      &.visible {
        height: 6rem;
      }
      .scroll-tabs {
        display: flex;
        .scroll-tab {
          flex-shrink: 0;
          padding: 0.25rem 0.875rem;
          font-size: 0.75rem;
          font-family: PingFangSC, PingFangSC-Heavy;
          font-weight: 800;
          color: #e2e2e2;
          &.selected {
            color: #99c901;
          }
          &.more {
            position: relative;
            font-size: 0.75rem;
            font-family: PingFangSC, PingFangSC-Heavy;
            font-weight: 800;
            color: #ffffff;
            background: #99c901;
            padding-right: 1.25rem;
            .new-tag {
              position: absolute;
              top: 0.125rem;
              right: 0.125rem;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 1.25rem;
              height: 0.625rem;
              background: #ffffff;
              border-radius: 0.375rem;
              font-size: 0.4375rem;
              font-family: PingFangSC, PingFangSC-Heavy;
              font-weight: 800;
              color: #99c901;
            }
          }
        }
      }
      .scroll-items {
        display: flex;
        .scroll-item {
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          padding: 0.25rem;
          padding-bottom: 0;
          flex-shrink: 0;
          height: 3.75rem;
          width: 3.75rem;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          margin: 0.25rem;
          font-size: 0.625rem;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #333333;
          &:active,
          &:focus,
          &.selected {
            border: 0.125rem solid #ffcc19;
          }
          .item-name {
            width: 100%;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
  .create-work-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0.25rem 1.25rem;
    width: 100%;
    z-index: 10;
    background-color: #ffffff;
    /deep/ .custom-button {
      font-size: 0.875rem;
      width: 3.75rem;
      height: 1.25rem;
    }
  }
}
</style>
