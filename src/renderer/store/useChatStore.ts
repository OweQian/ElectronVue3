import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { ModelChat } from '../../model/ModelChat';
import { useMessageStore } from './useMessageStore';

// mock data
const prepareData = () => {
  let result = [];
  for (let i = 0; i < 10; i++) {
    let model = new ModelChat();
    model.fromName = '聊天对象' + i;
    model.sendTime = '昨天';
    model.lastMsg = '这是此会话的最后一条消息' + i;
    model.avatar = 'https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c';
    result.push(model);
  }
  return result;
};

export const useChatStore = defineStore('chat', () => {
  let data: Ref<ModelChat[]> = ref(prepareData());
  const selectItem = (item: ModelChat) => {
    if (item.isSelected) return;
    data.value.forEach((v) => (v.isSelected = false));
    item.isSelected = true;
    const messageStore = useMessageStore();
    messageStore.initData(item);
  };
  return { data, selectItem };
});
