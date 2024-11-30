<template>
  <div class="custom-width mb-1 mt-3" aria-label="PhonebookItem">
    <div class="card" style="background: #CCC; padding-left: 5px;">
      <div class="row">
        <div class="col-left circle-icon" @click="handleIconClick" style="cursor: pointer;">
          <img v-if="avatar !== 'null'" :src="`http://localhost:3001/uploads/${avatar}`" style="height: 100%;"
            alt="profile" />
          <FontAwesomeIcon v-else :icon="faUserTie" />
        </div>
        <div class="col-right">
          
            <template v-if="isEditing">
              <input type="text" v-model="editableName" class="custom-form-control" style="margin-bottom: 5px;"
                aria-label="edit-name" />
              <input type="text" v-model="editablePhone" class="custom-form-control" style="margin-bottom: 5px;"
                aria-label="edit-phone" />
                <div class="row-item">
              <button class="btn" @click="handleSave" aria-label="save-item">
                <FontAwesomeIcon :icon="faFloppyDisk" />
              </button>
              </div>
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
                <PhonebookDeleteConfirmation :id = "props.id"/>
              </div>
            </template>
        </div>
      </div>
    </div>
    <input type="file" ref="fileInputRef" style="display: none;" @change="handleFileChange" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { usePhonebookStore } from "@/stores/phonebookStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserTie, faPenToSquare, faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import PhonebookDeleteConfirmation from "./PhonebookDeleteConfirmation.vue";

export default {
  name: "PhonebookItem",
  components: {
    FontAwesomeIcon,
    PhonebookDeleteConfirmation
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

    const editableName = ref(props.name);
    const editablePhone = ref(props.phone);
    const isEditing = ref(false);
    const fileInputRef = ref(null);

    // Methods
    const toggleEdit = () => {
      isEditing.value = !isEditing.value;
      console.log("isEditing", isEditing.value)
    };

    const handleSave = () => {
      console.log(editableName, editablePhone)
      updatePhonebook({
        id: props.id,
        name: editableName.value,
        phone: editablePhone.value,
      });
      isEditing.value = false;
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
      fileInputRef,
      toggleEdit,
      handleSave,
      handleIconClick,
      handleFileChange,
      faUserTie,
      faPenToSquare,
      faFloppyDisk,
      faTrashCan,
      isEditing,
      editableName,
      editablePhone,
      props
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
    /* display: flex; */
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    border: 1px solid #000000; 
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s ease-in-out;
}

.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  /* flex: 1; */
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.col-right {
  flex: 2;
  margin-top: 16px;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  padding-right: 8px;
}

.row-item {
  margin-bottom: 5px;
  
}

.custom-form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 1px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

/* Responsive design */
@media (min-width: 768px) {
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .card {
    flex: 0 0 100%; /* Full width on smaller screens */
    max-width: none; /* Remove max-width limitation */
  }
}

@media (max-width: 480px) {
  .card {
    flex: 0 0 100%;
    max-width: none; /* Full width */
  }
}
</style>