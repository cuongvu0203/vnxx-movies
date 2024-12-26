<template>
    <div>
        <h1 class="text-xl font-bold mb-4">Tìm kiếm: {{ keyword }}</h1>
        <div class="mb-4">
            <input
                v-model="keyword"
                placeholder="Nhập từ khóa tìm kiếm..."
                class="border p-2 rounded w-full"
                @keyup.enter="performSearch"
            />
        </div>
        <div
            v-if="movies.length > 0"
            class="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
            <MovieCard
                v-for="movie in movies"
                :key="movie._id"
                :movie="movie"
            />
        </div>
        <div v-else class="text-center mt-8">
            <p>Không tìm thấy kết quả nào</p>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { searchMovies } from '~/utils/api'
import MovieCard from '~/components/MovieCard'

const keyword = ref('')
const movies = ref([])

const performSearch = async () => {
    if (keyword.value.trim()) {
        movies.value = await searchMovies(keyword.value)
    } else {
        movies.value = []
    }
}

onMounted(() => {
    const route = useRoute()
    keyword.value = route.query.keyword || ''
    if (keyword.value) {
        performSearch()
    }
})
</script>
