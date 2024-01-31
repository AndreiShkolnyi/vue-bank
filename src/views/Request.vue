<template>
    <app-loader v-if="loading"></app-loader>
    <app-page v-else-if="request" back title="Заявка">
        <p>
            <strong>ФИО : </strong>
            {{ request.fullName }}
        </p>
        <p>
            <strong>Номер телефона : </strong>
            {{ request.phone }}
        </p>
        <p>
            <strong>Сумма : </strong>
            {{ currencyFormatter(request.value) }}
        </p>

        <p>
            <strong>Статус заявки : </strong>
            <app-status :type="request.status"></app-status>
        </p>

        <div class="form-control">
            <label for="status">Статус</label>
            <select id="status" v-model="status">
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button class="btn danger" @click="remove">Удалить</button>
        <button v-if="hasChanges" class="btn" @click="update">Обновить</button>
    </app-page>
    <h3 v-else class="text-center text-white">
        Выбранной вами заявки не существует
    </h3>
</template>

<script>
import AppPage from '../components/AppPage.vue'
import AppLoader from '../components/ui/AppLoader.vue'
import AppStatus from '../components/ui/AppStatus.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { currencyFormatter } from '../utils/currency-formatter.js'

export default {
    components: { AppPage, AppLoader, AppStatus },
    setup() {
        const loading = ref(true)
        const request = ref({})
        const status = ref()
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const hasChanges = computed(() => request.value.status !== status.value)

        onMounted(async () => {
            loading.value = true
            request.value = await store.dispatch(
                'request/loadById',
                route.params.id
            )
            status.value = request.value?.status
            loading.value = false
        })

        const remove = async () => {
            await store.dispatch('request/deleteById', route.params.id)
            router.push('/')
        }

        const update = async () => {
            if (hasChanges.value) {
                const data = {
                    ...request.value,
                    id: route.params.id,
                    status: status.value
                }
                await store.dispatch('request/update', data)
                request.value.status = status.value
            }
            return
        }

        return { request, loading, remove, update, status, hasChanges }
    },
    methods: { currencyFormatter }
}
</script>

<style lang="scss" scoped></style>
