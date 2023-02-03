<template>
  <div class="BarLeft">
    <div class="userIcon">
      <img alt="" src="../assets/avatar.jpg">
    </div>
    <div class="menu">
      <router-link v-for="item in mainWindowRoutes" :class="['menuItem', {'selected': item.isSelected}]"
                   :to="item.path">
        <i :class="['icon', item.isSelected ? item.iconSelected : item.icon]"></i>
      </router-link>
    </div>
    <div class="setting" @click="openSettingWindow">
      <div class="menuItem">
        <i class="icon icon-setting"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {createDialog} from "../common/Dialog";

let mainWindowRoutes = ref([
  {path: '/WindowMain/Chat', isSelected: true, icon: 'icon-chat', iconSelected: 'icon-chat'},
  {path: '/WindowMain/Contact', isSelected: false, icon: 'icon-tongxunlu1', iconSelected: 'icon-tongxunlu'},
  {path: '/WindowMain/Collection', isSelected: false, icon: 'icon-shoucang1', iconSelected: 'icon-shoucang'},
])
let route = useRoute();
watch(
    () => route,
    () => mainWindowRoutes.value.forEach(v => v.isSelected = v.path === route.fullPath),
    {
      immediate: true,
      deep: true,
    });
const openSettingWindow = async () => {
  const config = {modal: false, width: 2002, webPreferences: {webviewTag: false}};
  const dialog = await createDialog('/WindowSetting/AccountSetting', config);
  const msg = { msgName: "hello", value: "msg from your parent" };
  window.addEventListener("message", (e) => {
    console.log(e.data);
  });
  dialog?.postMessage(msg);
};
</script>

<style lang="scss" scoped>
.BarLeft {
  width: 54px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(46, 46, 46);
  -webkit-app-region: drag;
}

.userIcon {
  height: 84px;
  padding-top: 36px;
  box-sizing: border-box;

  img {
    width: 34px;
    height: 34px;
    margin-left: 10px;
  }
}

.menu {
  flex: 1;
}

.menuItem {
  height: 44px;
  line-height: 44px;
  text-align: center;
  padding-left: 12px;
  padding-right: 12px;
  display: block;
  text-decoration: none;
  color: rgb(126, 126, 126);
  cursor: pointer;
  -webkit-app-region: no-drag;

  i {
    font-size: 22px;
  }

  &:hover {
    color: rgb(141, 141, 141);
  }
}

.selected {
  color: rgb(7, 193, 96);

  &:hover {
    color: rgb(7, 193, 96);
  }
}

.setting {
  margin-bottom: 5px;
}
</style>
