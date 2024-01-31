<template>
    <div v-if="message" :class="['alert', message.type]">
        <p class="alert-title">{{ title }}</p>
        <p>{{ message.value }}</p>
        <span class="alert-close" @click="close">&times;</span>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        const TITLES_MAP = {
            danger: 'Ошибка',
            warning: 'Внимание',
            primary: 'Отлично!'
        }
        const message = computed(() => store.state.message)
        const title = computed(() =>
            message.value ? TITLES_MAP[message.value] : null
        )

        return {
            message,
            title,
            close: () => store.commit('clearMessage')
        }
    }
}
</script>

<style></style>
