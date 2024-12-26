<template>
    <div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <GeneCard
                v-for="category in lstCategory"
                :key="category.id"
                :gene="category"
            />
        </div>
    </div>
</template>
<script setup>
import { getNewMovies } from '~/utils/api'
import GeneCard from '~/components/GeneCard.vue'

const { categories: lstCategory } = await getListCategorys()
</script>
