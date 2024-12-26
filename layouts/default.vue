<template>
    <div class="min-h-screen flex flex-col">
        <!-- Navbar -->
        <nav class="bg-gray-800 text-white py-4">
            <div class="container mx-auto flex justify-between items-center">
                <div class="text-2xl font-bold">
                    <nuxt-link to="/" class="hover:text-blue-300"
                        >vnxx.com</nuxt-link
                    >
                </div>
                <ul class="flex space-x-6">
                    <li>
                        <nuxt-link to="/" class="hover:text-blue-300"
                            >Trang chủ</nuxt-link
                        >
                    </li>
                    <li>
                        <nuxt-link to="/gene" class="hover:text-blue-300"
                            >Thể loại</nuxt-link
                        >
                    </li>
                    <!--<li>
                        <nuxt-link to="/phimle" class="hover:text-blue-300"
                            >Phim Lẻ</nuxt-link
                        >
                    </li>
                    <li>
                        <nuxt-link to="/search" class="hover:text-blue-300"
                            >Tìm Kiếm</nuxt-link
                        >
                    </li>-->
                </ul>
            </div>
        </nav>

        <!-- Content -->
        <main class="flex-grow container mx-auto py-6">
            <NuxtPage />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-4 text-center">
            © 2024 MovieApp - Xem phim chất lượng cao
        </footer>
    </div>
</template>
