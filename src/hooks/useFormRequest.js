import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

export function useFormRequest(fn) {
    const { handleSubmit, isSubmitting } = useForm({
        initialValues: {
            status: 'active'
        }
    })

    const {
        value: fullName,
        errorMessage: nameError,
        handleBlur: nameBlur
    } = useField('fullName', yup.string().trim().required().min(4))

    const {
        value: phone,
        errorMessage: phoneError,
        handleBlur: phoneBlur
    } = useField('phone', yup.string().trim().required().min(11))

    const {
        value: value,
        errorMessage: valueError,
        handleBlur: valueBlur
    } = useField('value', yup.string().required())

    const {
        value: status,
        errorMessage: statusError,
        handleBlur: statusBlur
    } = useField('status')

    const onSubmit = handleSubmit(fn)

    return {
        fullName,
        nameError,
        nameBlur,
        value,
        valueError,
        valueBlur,
        phone,
        phoneError,
        phoneBlur,
        status,
        statusBlur,
        statusError,
        onSubmit,
        isSubmitting
    }
}
