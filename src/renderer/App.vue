<script setup lang="ts">
import fs from 'fs';
import { ipcRenderer } from 'electron';
import { onMounted } from 'vue';

onMounted(() => {
  console.log(fs.writeFileSync);
  console.log(ipcRenderer);
});
</script>

<template>
  <router-view />
</template>

<style scoped>
</style>
