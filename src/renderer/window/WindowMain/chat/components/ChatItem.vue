<template>
  <div @click="itemClick(data)" :class="['ChatItem', { 'ChatItemSelected': data.isSelected}]">
    <div class="avatar">
      <img :src="data.avatar" alt="" />
    </div>
    <div class="ChatInfo">
      <div class="row">
        <div class="FromName">{{ data.fromName }}</div>
        <div class="TimeName">{{ data.sendTime }}</div>
      </div>
      <div class="row">
        <div class="LastMsg">{{ data.lastMsg }}</div>
        <div class="subscribe" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ModelChat } from '../../../../../model/ModelChat';
import { useChatStore } from '../../../../store/useChatStore';
defineProps<{data: ModelChat}>();
const store = useChatStore();
const itemClick = (item: ModelChat) => {
  store.selectItem(item);
};
</script>

<style scoped lang="scss">
.ChatItem {
  display: flex;
  height: 66px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: rgb(221, 219, 218);
  }
}
.ChatItemSelected {
  background: rgb(196, 196, 196);
  &:hover {
    background: rgb(196, 196, 196);
  }
}
.avatar {
  width: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 46px;
    height: 46px;
  }
}
.ChatInfo {
  flex: 1;
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.row {
  box-sizing: border-box;
  height: 28px;
  line-height: 28px;
  display: flex;
}
.FromName {
  flex: 1;
}
.TimeName {
  color: rgb(153, 153, 153);
  padding-right: 12px;
  font-size: 12px;
}
.LastMsg {
  color: rgb(153, 153, 153);
  flex: 1;
  font-size: 12px;
}
</style>
