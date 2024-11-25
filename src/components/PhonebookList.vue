<template>
    <div
      class="row justify-content-center"
      style="margin-top: 50px"
      aria-label="PhonebookList"
    >
      <PhonebookItem
        v-for="(phonebook, index) in phonebooks"
        :key="phonebook.id"
        :id="phonebook.id"
        :avatar="phonebook.avatar || 'null'"
        :name="phonebook.name"
        :phone="phonebook.phone"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { computed } from "vue";
  import { usePhonebookStore } from "@/stores/phonebookStore";
  import PhonebookItem from "./PhonebookItem.vue";
  export default {
    name: "PhonebookList",
    components: {
      PhonebookItem,
    },
    setup() {
      const phonebookStore = usePhonebookStore();
  
      // Use computed to get reactive phonebooks data
      const phonebooks = computed(() => phonebookStore.phonebooks);
  
      return {
        phonebooks,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any necessary styles */
  </style>
  