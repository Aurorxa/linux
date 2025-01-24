<template></template>
<script setup lang="ts">
import { onMounted } from "vue";
import TypeIt from "typeit";

onMounted(() => {
  new TypeIt(".tagline", {
    strings: [
      "云原生是一种基于云计算的架构理念，通过容器、微服务、DevOps 和动态编排技术（如：Kubernetes）构建可扩展、高效和弹性的应用系统。",
    ],
    speed: 200,
  }).go();
});
</script>
