<template>
    <div class="container mx-auto p-4">
        <div v-if="currentEp" class="w-100 gap-4 p-0">
            <div class="responsive-iframe-container mb-2">
                <iframe
                    class="responsive-iframe"
                    :src="currentEp.link"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>
        <div v-if="movie" class="movie-details flex flex-col lg:flex-row gap-4">
            <!-- Poster -->
            <div class="poster w-full lg:w-1/3">
                <img
                    :src="movie.thumb_url || '/placeholder.jpg'"
                    :alt="movie.name || 'Movie poster'"
                    class="rounded-lg shadow-md"
                />
            </div>

            <!-- Movie Info -->
            <!-- Movie Info -->
            <div class="info w-full lg:w-2/3">
                <h1 class="text-3xl font-bold mb-2">
                    {{ movie.name + ' ' + currentEp.name || 'Tên phim chưa có' }}
                </h1>
                <!--<p class="italic text-gray-600 mb-4">
                    {{ movie.name || 'Đang cập nhật' }}
                </p>-->
                <p class="text-gray-800">
                    {{ movie.content || 'Mô tả chưa có' }}
                </p>
                <ul class="mt-4 space-y-2">
                    <li>
                        <strong>Thể loại:</strong>
                        {{
                            movie.categories?.map((c) => c.name).join(', ') ||
                            'Đang cập nhật'
                        }}
                    </li>
                    <li>
                        <strong>Quốc gia:</strong>
                        {{
                            movie.country?.name ||
                            'Đang cập nhật'
                        }}
                    </li>
                    <li>
                        <strong>Trạng thái:</strong>
                        {{ movie.status || 'Đang cập nhật' }}
                    </li>
                    <li>
                        <strong>Thời lượng:</strong>
                        {{ movie.time || 'Đang cập nhật' }}
                    </li>
                    <li>
                        <strong>Diễn viên:</strong>
                        {{ movie.actor?.join(', ') || 'Đang cập nhật' }}
                    </li>
                    <!--<li>
                        <strong>Đạo diễn:</strong>
                        {{ movie.director?.join(', ') || 'Đang cập nhật' }}
                    </li>-->
                </ul>
            </div>
        </div>

        <!-- Episodes List -->
        <div v-if="episodes.length > 0" class="episodes mt-8">
            <h2 class="text-2xl font-bold mb-4">Danh sách tập</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                    v-for="episode in episodes"
                    :key="episode.slug"
                    class="episode-card bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg"
                >
                    <nuxt-link
                        :to="`/xem-phim-${movie.slug}-tap-${episode.slug}`"
                    >
                        <p class="text-lg text-red-600 text-center font-medium">
                            {{ episode.name || 'Tên tập chưa có' }}
                        </p>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <!-- Fallback Message -->
        <div v-else class="text-center mt-8">
            <p class="text-gray-600">
                Thông tin phim hoặc danh sách tập đang được cập nhật.
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from '#app'
import { getMovieBySlug } from '~/utils/api'

const movie = ref(null) // Use null for initial state
const episodes = ref([]) // Initialize episodes
const currentEp = ref(null)

const fetchMovie = async (slug, epslug) => {
    try {
        const data = await getMovieBySlug(slug)
        movie.value = data.movie || {}
         // Kiểm tra episodes trước khi gán
        if (movie.value.episodes?.length > 0 && movie.value.episodes[0].server_data?.length > 0) {
            episodes.value = movie.value.episodes[0].server_data;
        } else {
            episodes.value = [];
        }
        currentEp.value = episodes.value.find((ep) => ep.slug === epslug) || episodes.value[0]
        console.log(movie)
        console.log(episodes)
    } catch (error) {
        console.error('Error fetching movie:', error)
        movie.value = {}
        episodes.value = []
    }
}

onMounted(() => {
    const route = useRoute()
    console.log(route.params)
    const slug = route.params.slug
    const epslug = route.params.epslug
    if (slug && epslug) {
        fetchMovie(slug, epslug)
    }
})
</script>

<style scoped>
.container {
    max-width: 1200px;
}
.responsive-iframe-container {
    position: relative;
    width: 100%; /* Chiều rộng đầy đủ */
    padding-bottom: 56.25%; /* 16:9 = 9/16 = 0.5625 => 56.25% */
    height: 0; /* Đặt chiều cao là 0 để sử dụng padding */
    overflow: hidden; /* Ẩn nội dung tràn ra ngoài */
}

.responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; /* Chiều rộng đầy đủ */
    height: 100%; /* Chiều cao bằng padding */
    border: none; /* Không có viền */
}
</style>
