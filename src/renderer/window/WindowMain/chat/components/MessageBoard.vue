<template>
  <div class="MessageBord">
    <BarTop />
    <div class="MessageList">
      <MessageItem :data="item" v-for="item in messageStore.data" :key="item.id"></MessageItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BarTop from '../../../../components/BarTop.vue';
import { ModelChat } from '../../../../../model/ModelChat';
import { useMessageStore } from '../../../../store/useMessageStore';
// import { useChatStore } from '../../../../store/useChatStore';
import MessageItem from './MessageItem.vue';

// const chatStore = useChatStore();
const messageStore = useMessageStore();

// let curId = '';
//
// chatStore.$subscribe((mutations, state) => {
//   const item = state.data.find(v => v.isSelected) as ModelChat;
//   if (item?.id !== curId) {
//     messageStore.initData(item);
//     curId = item?.id;
//   }
// })
</script>

<style scoped lang="scss">
.MessageBord {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.MessageList {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgb(245, 245, 245);
}
</style>
