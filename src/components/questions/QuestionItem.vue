<template>
    <div class="question" @click="toggle">
        <div class="h4 question-title">
            {{ question.title }}
        </div>
        <p v-if="isOpen" class="question-body">{{ question.text }}</p>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: ['question'],
    setup() {
        const isOpen = ref(false)
        const toggle = () => {
            isOpen.value = !isOpen.value
        }
        return { isOpen, toggle }
    }
}
</script>

<style lang="scss" scoped></style>
