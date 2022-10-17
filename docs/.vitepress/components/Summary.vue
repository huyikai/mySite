<template>
  <ul>
    <li v-for="(item, index) in catalog" :key="index">
      <a :href="normalizeLink(item.link)">{{ item.text }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { normalizeLink } from 'vitepress/dist/client/theme-default/support/utils.js';
import { useData } from 'vitepress';
const data = useData();
const path = data.page.value.relativePath.replace('index.md','')
const catalog = data.theme.value.sidebar[`/${path}`][0]['items'];
</script>