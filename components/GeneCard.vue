<template>
    <nuxt-link
        :to="`/chuyen-muc-${gene.slug}`"
        class="border p-2 rounded shadow hover:shadow-lg hover:cursor-pointer"
    >
        <div class="mt-2">
            <h3 class="text-lg font-semibold text-center">{{ gene.name }}</h3>           
        </div>
    </nuxt-link>
</template>
<script setup>
defineProps(['gene'])
</script>
