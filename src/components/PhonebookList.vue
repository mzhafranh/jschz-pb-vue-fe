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
    grid-template-columns: repeat(5, 1fr); /* 5 cards per row */
    gap: 10px;
    padding-right: 10px;
    padding-left: 10px;
    align-items: stretch; /* Ensures cards stretch to fill the row height */
    justify-items: stretch; /* Ensures cards fill their grid cell horizontally */
}

/* Responsive design */
@media (max-width: 440px) {
    .card-container {
        grid-template-columns: repeat(1, 1fr);
    }
}

@media (min-width: 441px) {
    .card-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 650px) {
    .card-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 860px) {
    .card-container {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (min-width: 1070px) {
    .card-container {
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>