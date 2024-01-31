<template>
    <app-page back title="Помощь">
        <question-item
            v-for="question in questions"
            :key="question.title"
            :question="question"
        />
    </app-page>
</template>

<script>
import AppPage from '../components/AppPage.vue'
import QuestionItem from '../components/questions/QuestionItem.vue'
export default {
    components: { AppPage, QuestionItem },
    setup() {
        const questions = [
            {
                title: 'Что есть в данно приложении?',
                text: 'Тут есть все для ведения уето заявок, смены их статуса, удалению и добавления'
            },
            {
                title: 'Как тут работает авторизация?',
                text: 'Для авторизации необходимо ввести адрес своей почты и пароль'
            }
        ]
        return { questions }
    }
}
</script>

<style lang="scss" scoped></style>
