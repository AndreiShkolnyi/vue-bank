<template>
    <form class="form" @submit.prevent="onSubmit">
        <div :class="['form-control', { invalid: nameError }]">
            <label for="fullName">ФИО</label
            ><input id="fullName" v-model="fullName" type="text" />
            <small v-if="nameError">{{ nameError }}</small>
        </div>
        <div :class="['form-control', { invalid: phoneError }]">
            <label for="phone">Телефон</label
            ><input id="phone" v-model="phone" type="tel" />
            <small v-if="phoneError">{{ phoneError }}</small>
        </div>
        <div :class="['form-control', { invalid: valueError }]">
            <label for="value">Сумма заявки</label
            ><input id="value" v-model="value" type="number" />
            <small v-if="valueError">{{ valueError }}</small>
        </div>
        <div :class="['form-control', { invalid: statusError }]">
            <label for="status">Статус</label
            ><select id="status" v-model="status">
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
            <small v-if="statusError">{{ statusError }}</small>
        </div>
        <button class="btn primary" type="submit" :disabled="isSubmitting">
            Создать
        </button>
    </form>
</template>

<script>
import { useFormRequest } from '../../hooks/useFormRequest.js'
import { useStore } from 'vuex'

export default {
    emits: ['created'],
    setup(_, { emit }) {
        const store = useStore()
        const submit = async (values) => {
            await store.dispatch('request/create', values)
            emit('created', values)
        }
        return { ...useFormRequest(submit) }
    }
}
</script>

<style lang="scss" scoped></style>
