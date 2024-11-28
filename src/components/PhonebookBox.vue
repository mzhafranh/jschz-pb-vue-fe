<template>
  <div style="background-color: white;">
    <div v-if="phonebooks">
      <PhonebookTopBar/>
      <PhonebookList/>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { computed } from "vue";
import { usePhonebookStore } from "@/stores/phonebookStore";
import PhonebookTopBar from "@/components/PhonebookTopBar.vue";
import PhonebookList from "@/components/PhonebookList.vue";

export default {
  name: "PhonebookBox",
  components: {
    PhonebookTopBar,
    PhonebookList,
  },
  setup() {
    const phonebookStore = usePhonebookStore(); // Access the Pinia store
    const { keyword, sort, refreshPhonebookData } =  phonebookStore;
    const phonebooks = computed(() => phonebookStore.phonebooks);

    // Fetch data on component mount
    onMounted(() => {
      if (!phonebooks.value.length) {
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
  height: 100%;
  /* Full height of the parent */
  width: 100%;
  /* Full width of the parent */
}
</style>