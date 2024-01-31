import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useLogin() {
    const store = useStore()
    const router = useRouter()

    const { handleSubmit, isSubmitting, submitCount } = useForm()

    const {
        value: email,
        errorMessage: emailError,
        handleBlur: emailBlur
    } = useField('email', yup.string().trim().required().email())

    const {
        value: password,
        errorMessage: passwordError,
        handleBlur: passwordBlur
    } = useField('password', yup.string().trim().required().min(6))

    const isTooManyAttempts = computed(() => submitCount.value >= 3)

    watch(isTooManyAttempts, (val) => {
        if (val) {
            setTimeout(() => (submitCount.value = 0), 30000)
        }
    })

    const onSumbit = handleSubmit(async (values) => {
        try {
            await store.dispatch('auth/login', values)
            router.push('/')
        } catch (error) {
            throw new Error(error.message)
        }
    })

    return {
        email,
        emailError,
        emailBlur,
        password,
        passwordError,
        passwordBlur,
        onSumbit,
        isSubmitting,
        isTooManyAttempts
    }
}
