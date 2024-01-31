import axios from '../../axios/request.js'
import store from '../index.js'

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        },
        removeRequest(state, id) {
            state.requests.filter((request) => request.id === id)
        }
    },
    actions: {
        async create({ commit, dispatch }, payload) {
            try {
                const token = store.getters['auth/token']
                const { data } = await axios.post(
                    `/requests.json?auth=${token}`,
                    payload
                )
                commit('addRequest', { ...payload, id: data.name })
                dispatch(
                    'setMessage',
                    {
                        value: 'Заявка успешно создана',
                        type: 'primary'
                    },
                    { root: true }
                )
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: 'Не удалось обработать заявку',
                        type: 'danger'
                    },
                    { root: true }
                )
            }
        },
        async load({ commit, dispatch }) {
            try {
                const token = store.getters['auth/token']
                const { data } = await axios.get(`/requests.json?auth=${token}`)
                const requests = Object.keys(data).map((id) => ({
                    ...data[id],
                    id
                }))
                commit('setRequests', requests)
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: 'Не удалось загрузить список заявок',
                        type: 'danger'
                    },
                    { root: true }
                )
            }
        },
        async loadById({ dispatch }, id) {
            try {
                const token = store.getters['auth/token']
                const { data } = await axios.get(
                    `/requests/${id}.json?auth=${token}`
                )
                return { ...data }
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: 'Не удалось найти информацию по данной заявке',
                        type: 'danger'
                    },
                    { root: true }
                )
            }
        },
        async deleteById({ commit, dispatch }, id) {
            try {
                const token = store.getters['auth/token']
                await axios.delete(`/requests/${id}.json?auth=${token}`)
                commit('removeRequest', id)
                dispatch(
                    'setMessage',
                    {
                        value: 'Заявка была успешно удалена',
                        type: 'primary'
                    },
                    { root: true }
                )
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: 'Не удалось удалить заявку',
                        type: 'danger'
                    },
                    { root: true }
                )
            }
        },
        async update({ dispatch }, request) {
            try {
                const token = store.getters['auth/token']
                await axios.put(
                    `/requests/${request.id}.json?auth=${token}`,
                    request
                )
                dispatch(
                    'setMessage',
                    {
                        value: 'Статус заявки успешно обновлен',
                        type: 'primary'
                    },
                    { root: true }
                )
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: 'Не удалось обновить статус заявки',
                        type: 'danger'
                    },
                    { root: true }
                )
            }
        }
    },
    getters: {
        requests(state) {
            return state.requests
        }
    }
}
