<template>
    <div style="background-color: white;">
      <PhonebookTopBar />
      <div v-if="phonebooks && phonebooks.length">
        <!-- <PhonebookList /> -->
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { onMounted } from "vue";
  import { usePhonebookStore } from "@/stores/phonebookStore";
  import PhonebookTopBar from "@/components/PhonebookTopBar.vue";
//   import PhonebookList from "./PhonebookList.vue";
  
  export default {
    name: "PhonebookBox",
    // components: {
    //   PhonebookTopBar,
    //   PhonebookList,
    // },
    components: {
      PhonebookTopBar,
    },
    setup() {
      const phonebookStore = usePhonebookStore(); // Access the Pinia store
      const { phonebooks, keyword, sort, refreshPhonebookData } = phonebookStore;
  
      // Fetch data on component mount
      onMounted(() => {
        if (!phonebooks.length) {
          console.log("Fetch in PhonebookBox");
          refreshPhonebookData({ keyword, sort, page: 1 });
        }
      });
  
      return {
        phonebooks,
      };
    },
  };
  </script>
  
  <style scoped>
  .phonebook-box {
    display: flex;
    flex-direction: column;
    height: 100%; /* Full height of the parent */
    width: 100%;  /* Full width of the parent */
    }
  </style>
  