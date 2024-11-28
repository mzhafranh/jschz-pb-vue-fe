<script setup lang="ts">
import PhonebookBox from '@/components/PhonebookBox.vue';
import HomeView from './views/HomeView.vue';
</script>

<template>
    <main>
      <router-view />
    </main>
</template>


<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
