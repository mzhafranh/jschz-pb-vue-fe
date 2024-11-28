<template>
    <div aria-label="PhonebookDeleteConfirmation" style="display: none;"></div>
    <!-- Button to show the form -->
    <button class="btn p-1" @click="handleOpenConfirmation" aria-label="delete-item">
      <FontAwesomeIcon :icon="faTrashCan" />
    </button>

    <!-- Fullscreen form overlay -->
    <div v-if="isFormVisible" style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        ">
      <div style="
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            width: 60%;
          ">
        <div style="align-items: center; text-align: center;">
          <p>Apakah anda yakin menghapus data ini?</p>
          <button type="button" @click="handleDelete" class="btn"
            style="background-color: #AF8210; color: #fff; margin: 5px 5px 5px 5px; width: 45%;">
            ya
          </button>
          <button type="button" @click="handleCloseConfirmation" class="btn"
            style="background-color: #AF8210; color: #fff; margin: 5px 5px 5px 5px; width: 45%;">
            tidak
          </button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { usePhonebookStore } from "@/stores/phonebookStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "PhonebookDeleteConfirmation",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  setup(props) {
    const phonebookStore = usePhonebookStore();
    const { removePhonebook, keyword, sort } = phonebookStore;

    const isFormVisible = ref(false);

    const handleOpenConfirmation = () => {
      isFormVisible.value = true;
    };

    const handleCloseConfirmation = () => {
      isFormVisible.value = false;
    };

    const handleDelete = () => {
      removePhonebook({
        id: props.id,
        keyword,
        sort,
      });
      isFormVisible.value = false;
    };

    return {
      isFormVisible,
      handleOpenConfirmation,
      handleCloseConfirmation,
      handleDelete,
      faTrashCan,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
.btn {
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-size: 1rem;
}
</style>