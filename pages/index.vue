<template>
    <div>
        <h1>Phim Mới Cập Nhật</h1>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <MovieCard
                v-for="movie in lstMovie"
                :key="movie.id"
                :movie="movie"
            />
        </div>
        <div class="px-4 py-3 flex items-center justify-between sm:px-6">
            <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p class="text-sm text-black dark:text-white">
                        Trang <span class="font-medium mx-1">{{ currentPage }}</span> |
                        Tổng <span class="font-medium mx-1">{{ totalMovies }}</span> kết quả
                    </p>
                </div>
                <div>
                    <nav
                        class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                    >
                        <button
                            @click="fetchMovies(currentPage - 1)"
                            :disabled="currentPage <= 1"
                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border bg-white dark:bg-slate-700/10 dark:bg-gray-800 border-gray-300 text-gray-700 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-900 text-sm font-medium"
                        >
                            <span class="sr-only">Trước</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                class="w-5 h-5 inline"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                />
                            </svg>
                        </button>
                        <span
                            v-for="page in Math.min(totalPages, 5)" 
                            :key="page"
                            @click="fetchMovies(page)"
                            :class="{
                                'z-10 bg-indigo-50 dark:bg-slate-700/10 border-indigo-500 text-indigo-600':
                                    page === currentPage,
                                'bg-white dark:bg-slate-700/10 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-gray-900':
                                    page !== currentPage,
                            }"
                            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer"
                        >
                            {{ page }}
                        </span>
                        <button
                            @click="fetchMovies(currentPage + 1)"
                            :disabled="currentPage >= totalPages"
                            class="relative inline-flex items-center px-2 py-2 rounded-r-md border bg-white dark:bg-slate-700/10 border-gray-300 text-gray-700 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-900 text-sm font-medium"
                        >
                            <span class="sr-only">Sau</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                                class="w-5 h-5 inline"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getNewMovies } from "~/utils/api";
import MovieCard from "~/components/MovieCard";

// Biến trạng thái
const lstMovie = ref([]);
const currentPage = ref(1); // Trang hiện tại
const totalPages = ref(0); // Tổng số trang
const totalMovies = ref(0); // Tổng số kết quả

// Hàm lấy dữ liệu phim
const fetchMovies = async (page = 1) => {
    if (page < 1 || (totalPages.value && page > totalPages.value)) return;

    try {
        const { movies, page: pageInfo } = await getNewMovies(page);

        // Cập nhật danh sách phim và thông tin phân trang
        lstMovie.value = movies;
        currentPage.value = pageInfo.current_page;
        totalMovies.value = pageInfo.total;
        totalPages.value = pageInfo.last_page;
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};

// Lấy dữ liệu lần đầu
fetchMovies();
</script>
