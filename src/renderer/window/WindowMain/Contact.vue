<template>
  <div class="ContactBoard">
    <BarTop />
    <div class="contentTest">
      <button @click="insertData">增加一行数据</button>
      <button @click="insertMultiData">增加多行数据</button>
      <button @click="selectData">查询一行数据</button>
      <button @click="updateData">修改一行数据</button>
      <button @click="deleteData">删除一行数据</button>
      <br />
      <button @click="transaction">数据库事务</button>
      <br />
      <button @click="getFirstPage">获取第一页数据</button>
      <button @click="getNextPage">获取下一页数据</button>
      <button @click="getPrevPage">获取上一页数据</button>
      <button @click="getLastPage">获取最后一页数据</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from 'vue';
import BarTop from '../../components/BarTop.vue';
import {ModelChat} from '../../../model/ModelChat';
import {ModelMessage} from '../../../model/ModelMessage';
import { db } from '../../../common/db';

const insertData = async () => {
  let model = new ModelChat();
  model.fromName = "聊天对象";
  model.sendTime = Date.now();
  model.lastMsg = "这是此会话的最后一条消息";
  model.avatar = `https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c`;
  await db('Chat').insert(model);
}

const insertMultiData = async () => {
  let result = [];
  for (let i = 0; i < 10; i++) {
    let model = new ModelChat();
    model.fromName = "聊天对象" + i;
    model.sendTime = Date.now() + i;
    model.lastMsg = "这是此会话的最后一条消息" + i;
    model.avatar = `https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c`;
    result.push(model);
  }
  result[5].isSelected = true;
  await db("Chat").insert(result);
};

const selectData = async () => {
  let data = await db("Chat").where({ id: `256d6532-fcfe-4b81-a3f8-ee940f2de3e3` }).first();
  console.log(data);
};

const updateData = async () => {
  let data = await db("Chat")
      .update({ fromName: "三岛由纪夫", lastMsg: "就在刀刃猛然刺入腹部的瞬间，一轮红日在眼睑背面粲然升了上来。" })
      .where({ id: `256d6532-fcfe-4b81-a3f8-ee940f2de3e3` })
  console.log(data);
};

const deleteData = async () => {
  let data = await db("Chat").where({ id: `256d6532-fcfe-4b81-a3f8-ee940f2de3e3` }).delete();
  console.log(data);
};

const transaction = async () => {
  try {
    await db.transaction(async trx => {
      let chat = new ModelChat();
      chat.fromName = "聊天对象aaa";
      chat.sendTime = Date.now();
      chat.lastMsg = "这是此会话的最后一条消息";
      chat.avatar = `https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c`;
      await trx('Chat').insert(chat);
      let message = new ModelMessage();
      message.fromName = "聊天对象";
      message.chatId = chat.id;
      message.createTime = Date.now();
      message.isInMsg = true;
      message.messageContent = "这是我发给你的消息";
      message.receiveTime = Date.now();
      message.avatar = `https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c`;
      await trx('Message').insert(message);
    })
  } catch (error) {
    console.log(error);
  }
}

// 当前是第几页
let currentPageIndex: Ref<number> = ref(0);
// 每页数据行数
let rowCountPerPage: Ref<number> = ref(6);
// 总页数
let pageCount: Ref<number> = ref(-1);

// 获取某一页数据
const getOnePageData = async () => {
  let data = await db('Chat')
      .orderBy('sendTime', 'desc')
      .offset(currentPageIndex.value * rowCountPerPage.value)
      .limit(rowCountPerPage.value);
  console.log(data);
}

// 获取第一页数据
const getFirstPage = async () => {
  if (pageCount.value === -1) {
    // @ts-ignore
    let { count } = await db('Chat').count('id as count').first();
    count = count as number;
    pageCount.value = count / rowCountPerPage.value as number;
  }
  currentPageIndex.value = 0;
  await getOnePageData();
}

// 获取下一页数据
const getNextPage = async () => {
  currentPageIndex.value = currentPageIndex.value + 1 >= pageCount.value ? Math.ceil(pageCount.value) - 1 : currentPageIndex.value + 1;
  await getOnePageData();
}

// 获取上一页数据
const getPrevPage = async () => {
  currentPageIndex.value = currentPageIndex.value - 1 < 0 ? 0 : currentPageIndex.value - 1;
  await getOnePageData();
}

// 获取最后一页数据
const getLastPage = async () => {
  currentPageIndex.value = Math.ceil(pageCount.value) - 1;
  await getOnePageData();
}
</script>
<style scoped lang="scss">
.ContactBoard {
  flex: 1;
}
.contentTest {
  padding: 18px;
}
</style>
