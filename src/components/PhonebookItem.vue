<template>
    <div
      class="custom-width mb-1 mt-3"
      aria-label="PhonebookItem"
    >
      <div class="card" style="background: #CCC; padding-left: 5px;">
        <div class="row g-0">
          <div
            class="col-auto circle-icon mt-2 mb-2"
            @click="handleIconClick"
            style="cursor: pointer;"
          >
            <img
              v-if="avatar !== 'null'"
              :src="`http://localhost:3001/uploads/${avatar}`"
              style="height: 100%;"
              alt="profile"
            />
            <FontAwesomeIcon
              v-else
              :icon="faUserTie"
            />
          </div>
          <div class="col">
            <div class="card-body p-2">
              <template v-if="isEditing">
                <input
                  type="text"
                  v-model="editableName"
                  class="custom-form-control"
                  style="margin-bottom: 5px;"
                  aria-label="edit-name"
                />
                <input
                  type="text"
                  v-model="editablePhone"
                  class="custom-form-control"
                  style="margin-bottom: 5px;"
                  aria-label="edit-phone"
                />
                <button
                  class="btn"
                  @click="handleSave"
                  aria-label="save-item"
                >
                  <FontAwesomeIcon :icon="faFloppyDisk" />
                </button>
              </template>
              <template v-else>
                <p class="m-0">{{ editableName }}</p>
                <p class="m-0">{{ editablePhone }}</p>
                <button
                  class="btn p-1"
                  @click="toggleEdit"
                  aria-label="edit-item"
                >
                  <FontAwesomeIcon :icon="faPenToSquare" />
                </button>
                <PhonebookDeleteConfirmation :id="id" />
              </template>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref="fileInputRef"
        style="display: none;"
        @change="handleFileChange"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { ref, reactive } from "vue";
  import { usePhonebookStore } from "@/stores/phonebookStore";
  import PhonebookDeleteConfirmation from "@/components/PhonebookDeleteConfirmation.vue";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { faUserTie, faPenToSquare, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
  
  export default {
    name: "PhonebookItem",
    components: {
      PhonebookDeleteConfirmation,
      FontAwesomeIcon,
    },
    props: {
      id: {
        type: Number,
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
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  @media (max-width: 600px) {
  .custom-width {
    max-width: 100% !important;
    /* Custom max width for small screens */
    min-width: 100% !important;
    /* Custom min width for small screens */
  }
}

@media (min-width: 768px) {
  .custom-width {
    max-width: 33.33333333% !important;
    min-width: 33.33333333% !important;
  }
}

@media (min-width: 992px) {
  .custom-width {
    max-width: 260px !important;
    min-width: 260px !important;
  }
}

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
}

.card-body {
  padding: 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
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
  padding: 0.375rem 0.75rem;
}

  </style>
  