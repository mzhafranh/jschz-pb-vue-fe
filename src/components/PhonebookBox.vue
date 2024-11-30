<template>
  <div style="background-color: white;">
    <div v-if="phonebooks" class="scroll-container">
      <PhonebookTopBar/>
      <PhonebookList/>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { computed } from "vue";
import { usePhonebookStore } from "@/stores/phonebookStore";
import PhonebookTopBar from "@/components/PhonebookTopBar.vue";
import PhonebookList from "@/components/PhonebookList.vue";
import { throttle } from "lodash";

export default {
  name: "PhonebookBox",
  components: {
    PhonebookTopBar,
    PhonebookList,
  },
  setup() {
    const phonebookStore = usePhonebookStore(); // Access the Pinia store
    const { setPage, refreshPhonebookData, fetchPhonebookData } =  phonebookStore;
    const phonebooks = computed(() => phonebookStore.phonebooks);
    const page = computed(() => phonebookStore.page);
    const loading = computed(() => phonebookStore.loading);
    const totalPage = computed(() => phonebookStore.totalPage);
    const isLastPage = computed(() => page.value >= totalPage.value);
    const keyword = computed(() => phonebookStore.keyword);
    const sort = computed(() => phonebookStore.sort);


    // Fetch data on component mount
    onMounted(() => {
      if (!phonebooks.value.length) {
        console.log("Fetch in PhonebookBox");
        refreshPhonebookData({ keyword: keyword.value, sort: sort.value, page: 1 });
      }
    });

    // Infinite scroll handler
    const handleScroll = throttle(() => {
      const scrollContainer = document.querySelector(".scroll-container");
      const nearBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      scrollContainer.clientHeight - 100;

      console.log(window.innerHeight, document.documentElement.scrollTop, scrollContainer.clientHeight)

      // const nearBottom =
      //   window.innerHeight + document.documentElement.scrollTop >=
      //   document.documentElement.offsetHeight - 300;

      //   console.log(window.innerHeight, document.documentElement.scrollTop, document.documentElement.offsetHeight)

      if (nearBottom && !loading.value && !isLastPage.value) {
        console.log("Triggered scroll");
        setPage(page.value + 1);
        fetchPhonebookData({ keyword: keyword.value, sort: sort.value, page: page.value });
      }
    }, 500);

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });


    return {
      phonebooks,
      page
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