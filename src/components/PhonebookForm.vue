<template>
    <div aria-label="PhonebookForm">
      <!-- Fullscreen form overlay -->
      <div
        style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        "
      >
        <!-- The form inside the overlay -->
        <div
          style="
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            width: 100%;
            height: 100%;
          "
        >
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <input
                type="text"
                class="custom-form-control"
                id="name"
                v-model="name"
                required
                style="border: 1px solid black;"
                aria-label="input-name"
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                class="custom-form-control"
                id="phone"
                v-model="phone"
                required
                style="border: 1px solid black;"
                aria-label="input-phone"
              />
            </div>
            <div style="align-items: center; text-align: center;">
              <button
                type="submit"
                class="btn"
                style="background-color: #af8210; color: #fff; margin: 5px; width: 45%;"
              >
                Save
              </button>
              <button
                type="button"
                @click="handleCloseForm"
                class="btn"
                style="background-color: #af8210; color: #fff; margin: 5px; width: 45%;"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { usePhonebookStore } from '@/stores/phonebookStore';
  
  export default defineComponent({
    name: 'PhonebookForm',
    setup() {
      const router = useRouter();
      const phonebookStore = usePhonebookStore();
  
      const name = ref('');
      const phone = ref('');
  
      const handleCloseForm = () => {
        router.replace('/');
      };
  
      const handleSubmit = () => {
        phonebookStore.addPhonebook({
          name: name.value,
          phone: phone.value,
          keyword: phonebookStore.keyword,
          sort: phonebookStore.sort,
        });
  
        console.log('Form Submitted', { name: name.value, phone: phone.value });
  
        // Clear form fields
        name.value = '';
        phone.value = '';
  
        router.replace('/');
      };
  
      return {
        name,
        phone,
        handleCloseForm,
        handleSubmit,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Optional custom styles */
  .custom-form-control {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .btn {
    cursor: pointer;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
  }
  </style>
  