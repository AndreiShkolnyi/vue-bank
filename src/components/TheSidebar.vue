<template>
    <div v-if="sidebar" class="sidebar">
        <span class="sidebar-close" @click="toggle">&times;</span>
        <div class="sidebar-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            aliquam autem, est hic ipsum mollitia nemo placeat sapiente
            similique! Amet corporis dolorem ducimus eaque id ipsum natus quia
            ratione voluptatem?
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    setup() {
        const store = useStore()

        const sidebar = computed(() => store.state.sidebar)

        const toggle = () => {
            store.commit('closeSidebar')
        }
        return { sidebar, toggle }
    }
}
</script>

<style lang="scss" scoped></style>
