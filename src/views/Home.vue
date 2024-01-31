<template>
    <app-loader v-if="loading"></app-loader>
    <app-page v-else title="Список заявок">
        <template #header>
            <button class="btn primary" @click="modalRef = true">
                Создать
            </button>
        </template>
        <request-filter v-model="filter"></request-filter>
        <request-table :requests="requests"></request-table>
        <teleport to="body">
            <app-modal
                v-if="modalRef"
                title="Создать заявку"
                @close="modalRef = false"
            >
                <request-modal
                    @created="modalRef = false"
                ></request-modal> </app-modal
        ></teleport>
    </app-page>
</template>

<script>
import { computed, onMounted, ref } from 'vue'

import AppPage from '../components/AppPage.vue'
import RequestTable from '../components/request/RequestTable.vue'
import RequestModal from '../components/request/RequestModal.vue'
import AppModal from '../components/ui/AppModal.vue'
import AppLoader from '../components/ui/AppLoader.vue'
import RequestFilter from '../components/request/RequestFilter.vue'

import { useStore } from 'vuex'
export default {
    name: 'Home',
    components: {
        AppModal,
        AppPage,
        RequestTable,
        RequestModal,
        AppLoader,
        RequestFilter
    },
    setup() {
        const modalRef = ref(false)
        const store = useStore()
        const loading = ref(false)
        const filter = ref({})

        onMounted(async () => {
            loading.value = true
            await store.dispatch('request/load')
            loading.value = false
        })

        const requests = computed(() =>
            store.getters['request/requests']
                .filter((request) => {
                    if (filter.value.name) {
                        return request.fullName.includes(filter.value.name)
                    }
                    return request
                })
                .filter((request) => {
                    if (filter.value.status) {
                        return request.status === filter.value.status
                    }
                    return request
                })
        )

        return {
            modalRef,
            requests,
            loading,
            filter,
            close: () => (modalRef.value = false)
        }
    }
}
</script>
