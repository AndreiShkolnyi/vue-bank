<template>
    <form class="card" @submit.prevent="onSumbit">
        <h1>Login</h1>
        <div :class="['form-control', { invalid: emailError }]">
            <label for="email">Email</label>
            <input id="email" v-model="email" type="email" @blur="emailBlur" />
            <small v-if="emailError">{{ emailError }}</small>
        </div>
        <div :class="['form-control', { invalid: passwordError }]">
            <label for="email">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                @blur="passwordBlur"
            />
            <small v-if="passwordError">{{ passwordError }}</small>
        </div>

        <button
            class="btn primary"
            type="submit"
            :disabled="isSubmitting || isTooManyAttempts"
        >
            Login
        </button>
        <span v-if="isTooManyAttempts" class="text-danger"
            >Слишком много попыток входа в учетную запись, попробуте позже</span
        >
    </form>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useLogin } from '../hooks/useLogin'
import error from '../utils/error'

export default {
    setup() {
        const route = useRoute()
        const store = useStore()

        if (route.query.message) {
            store.dispatch('setMessage', {
                value: error(route.query.message),
                type: 'warning'
            })
        }
        return { ...useLogin() }
    }
}
</script>

<style></style>
