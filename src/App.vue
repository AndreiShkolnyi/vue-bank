<template>
    <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import MainLayout from './layouts/MainLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
    components: {
        MainLayout,
        AuthLayout
    },
    setup() {
        const route = useRoute()
        return {
            layout: computed(() => route.meta.layout)
        }
    }
}
</script>

<style></style>
