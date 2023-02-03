<template>
  <div>WindowSetting</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { dialogReady } from "../common/Dialog";
onMounted(() => {
  console.log("ready", Date.now());
  window.addEventListener("message", (e) => {
    console.log(e.data);
    window.opener.postMessage({ msgName: "hello", value: "I am your son." });
  });
  dialogReady();
});
</script>

<style scoped>

</style>
