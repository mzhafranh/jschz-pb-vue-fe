<template>
    <div class="top-bar" aria-label="PhonebookTopBar">
      <!-- Sort Button -->
      <div class="button-container">
        <button @click="handleSortChange" class="sort-button" aria-label="sort">
          <FontAwesomeIcon
            :icon="sort === 'asc' ? faArrowDownAZ : faArrowDownZA"
            :size="20"
          />
        </button>
      </div>
  
      <!-- Search Input -->
      <div class="search-container" aria-label="search">
        <FontAwesomeIcon :icon="faMagnifyingGlass" class="search-icon" />
        <input
          v-model="keyword"
          @input="handleSearchChange"
          class="search-input"
          type="text"
          placeholder="Search"
          placeholder-text-color="gray"
        />
      </div>
  
      <!-- Add Button -->
      <div class="form-container">
        <button @click="goToFormScreen" class="add-button">
          <FontAwesomeIcon :icon="faUserPlus" :size="20" color="black" />
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { usePhonebookStore } from '@/stores/phonebookStore';
  import { useRouter } from 'vue-router';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import {
    faArrowDownAZ,
    faArrowDownZA,
    faMagnifyingGlass,
    faUserPlus,
  } from '@fortawesome/free-solid-svg-icons';
  
  export default defineComponent({
    name: 'PhonebookTopBar',
    components: {
      FontAwesomeIcon,
    },
    setup() {
      const phonebookStore = usePhonebookStore();
      const router = useRouter();
  
      const { keyword, sort, refreshPhonebookData, clearPhonebook } =
        phonebookStore;
  
      // Handles search input changes
      const handleSearchChange = () => {
        refreshPhonebookData({ keyword: phonebookStore.keyword, sort, page: 1 });
      };
  
      // Toggles the sort order and fetches new data
      const handleSortChange = () => {
        const newSortOrder = sort === 'asc' ? 'desc' : 'asc';
        phonebookStore.sort = newSortOrder;
        refreshPhonebookData({ keyword, sort: newSortOrder, page: 1 });
      };
  
      // Navigates to the form screen and clears the store
      const goToFormScreen = () => {
        clearPhonebook();
        router.replace({ name: 'Form' });
      };
  
      return {
        keyword,
        sort,
        handleSearchChange,
        handleSortChange,
        goToFormScreen,
        faArrowDownAZ,
        faArrowDownZA,
        faMagnifyingGlass,
        faUserPlus,
      };
    },
  });
  </script>
  
  <style scoped>
  .top-bar {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .button-container {
    margin-right: 8px;
  }
  .sort-button {
    padding: 10px;
    background-color: #af8210;
    border-radius: 5px;
  }
  .search-container {
    flex: 1;
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 3px;
    padding: 0 8px;
    margin: 0 8px;
    height: 38px;
  }
  .search-icon {
    margin-right: 5px;
  }
  .search-input {
    flex: 1;
    border: 1px solid;
    border-left-width: 0;
    border-right-width: 0;
    padding: 0 5px;
    height: 38px;
    outline: 0;
  }
  .form-container {
    margin-left: 8px;
  }
  .add-button {
    padding: 10px;
    background-color: #af8210;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  