<template>
    <nuxt-link
        :to="`/phim-${movie.slug}`"
        class="border p-2 rounded shadow hover:shadow-lg hover:cursor-pointer"
    >
        <img
            :src="`${correctThumbUrl(movie.thumb_url)}`"
            alt="Thumbnail"
            class="w-full h-48 object-cover rounded"
        />
        <div class="mt-2">
            <h3 class="text-lg font-semibold">{{ movie.name }}</h3>
            <p class="text-sm text-gray-500">Status: {{ movie.status }}</p>
            <p class="text-sm text-gray-500">Chất lượng: {{ movie.quality }}</p>
            <p class="text-sm text-gray-500">Thời lượng: {{ movie.time }}</p>
        </div>
    </nuxt-link>
</template>
<script setup>
defineProps(['movie'])
</script>
