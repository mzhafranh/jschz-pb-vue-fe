<template>
    <div class="card-container" style="margin-top: 20px" aria-label="PhonebookList">
        <PhonebookItem v-for="(phonebook, index) in phonebooks" :key="phonebook.id" :id="phonebook.id"
            :avatar="phonebook.avatar || 'null'" :name="phonebook.name" :phone="phonebook.phone" />
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
.card-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    /* 5 cards per row */
}

/* Responsive design */
@media (max-width: 600px) {
    .card-container {
        grid-template-columns: 1fr
    }
}

@media (min-width: 601px) {
    .card-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 992px) {
    .card-container {
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>