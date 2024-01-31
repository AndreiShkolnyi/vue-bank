<template>
    <h4 v-if="requests.length == 0" class="text-center">Заявок пока нет</h4>
    <table v-else class="table">
        <thead>
            <tr>
                <td>#</td>
                <td>ФИО</td>
                <td>Телефон</td>
                <td>Сумма</td>
                <td>Статус</td>
                <td>Действие</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(r, idx) in requests" :key="r.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ r.fullName }}</td>
                <td>{{ r.phone }}</td>
                <td>{{ currencyFormatter(r.value) }}</td>
                <td>
                    <app-status :type="r.status"></app-status>
                </td>
                <td>
                    <router-link
                        v-slot="{ navigate }"
                        custom
                        :to="{ name: 'Request', params: { id: r.id } }"
                    >
                        <button class="btn" @click="navigate">Открыть</button>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { currencyFormatter } from '../../utils/currency-formatter.js'

import AppStatus from '../ui/AppStatus.vue'
export default {
    name: 'RequestTable',
    components: { AppStatus },
    props: ['requests'],
    setup() {
        return {
            currencyFormatter
        }
    }
}
</script>

<style lang="scss" scoped></style>
