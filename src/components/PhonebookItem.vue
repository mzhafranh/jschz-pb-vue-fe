<template>
  <div class="custom-width mb-1 mt-3" aria-label="PhonebookItem">
    <div class="card" style="background: #CCC; padding-left: 5px;">
      <div class="row g-0">
        <div class="col-left circle-icon mt-2 mb-2" @click="handleIconClick" style="cursor: pointer;">
          <img v-if="avatar !== 'null'" :src="`http://localhost:3001/uploads/${avatar}`" style="height: 100%;"
            alt="profile" />
          <FontAwesomeIcon v-else :icon="faUserTie" />
        </div>
        <div class="col-right">
          <div class="card-body p-2">
            <template v-if="isEditing">
              <input type="text" v-model="editableName" class="custom-form-control" style="margin-bottom: 5px;"
                aria-label="edit-name" />
              <input type="text" v-model="editablePhone" class="custom-form-control" style="margin-bottom: 5px;"
                aria-label="edit-phone" />
              <button class="btn" @click="handleSave" aria-label="save-item">
                <FontAwesomeIcon :icon="faFloppyDisk" />
              </button>
            </template>
            <template v-else>
              <div class="row-item">
                <p class="m-0">{{ editableName }}</p>
              </div>
              <div class="row-item">
                <p class="m-0">{{ editablePhone }}</p>
              </div>
              <div class="row-item">
                <button class="btn p-1" @click="toggleEdit" aria-label="edit-item">
                  <FontAwesomeIcon :icon="faPenToSquare" />
                </button>
                <button class="btn p-1" @click="handleOpenConfirmation" aria-label="delete-item">
                  <FontAwesomeIcon :icon="faTrashCan" />
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <input type="file" ref="fileInputRef" style="display: none;" @change="handleFileChange" />
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { usePhonebookStore } from "@/stores/phonebookStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserTie, faPenToSquare, faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "PhonebookItem",
  components: {
    FontAwesomeIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const phonebookStore = usePhonebookStore();
    const { updatePhonebook, handleFileUpload } = phonebookStore;

    // Reactive data
    const state = reactive({
      isEditing: false,
      editableName: props.name,
      editablePhone: props.phone,
    });

    const fileInputRef = ref(null);

    // Methods
    const toggleEdit = () => {
      state.isEditing = !state.isEditing;
    };

    const handleSave = () => {
      updatePhonebook({
        id: props.id,
        name: state.editableName,
        phone: state.editablePhone,
      });
      state.isEditing = false;
    };

    const handleIconClick = () => {
      fileInputRef.value.click();
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (!file) {
        alert("No file selected");
        return;
      }
      handleFileUpload({
        file,
        id: props.id,
        keyword: phonebookStore.keyword,
        sort: phonebookStore.sort,
      });
    };

    return {
      ...state,
      fileInputRef,
      toggleEdit,
      handleSave,
      handleIconClick,
      handleFileChange,
      faUserTie,
      faPenToSquare,
      faFloppyDisk,
      faTrashCan
    };
  },
};
</script>

<style scoped>

/* Add any additional styles here */

.circle-icon {
  width: 80px;
  /* You can adjust this size */
  height: 80px;
  /* Keep width and height equal to make it a circle */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  /* Makes it a circle */
  overflow: hidden;
  /* Ensures icon is cropped to the circle */
}

.circle-icon svg {
  width: 80px;
  /* Adjust icon size if needed */
  height: 80px;
  /* Adjust icon size if needed */
}

.card {
  border: 1px solid #000000;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s ease-in-out;
  max-width: 18rem;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
}

.col {
  padding-right: 15px;
  padding-left: 15px;
  flex: 0 0 auto;
  width: 100%;
}

.col-auto {
  flex: 0 0 auto;
  width: auto;
}

.btn {
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-size: 1rem;
}

.col-left {
  flex: 1;
  margin-right: 5px;
}

.col-right {
  flex: 2;
  margin-top: 16px;
  align-items: stretch;
}

.row-item {
  margin-bottom: 5px;
  
}
</style>