import axios from 'axios'
import error from '../../utils/error'

const TOKEN_KEY = 'jwt-token'

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY)
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        removeToken(state) {
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        }
    },
    actions: {
        async login({ commit, dispatch }, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
                    import.meta.env.VITE_API_KEY
                }`
                const { data } = await axios.post(url, {
                    ...payload,
                    returnSecureToken: true
                })
                const token = data.idToken
                commit('setToken', token)
                commit('clearMessage', null, { root: true })
            } catch (e) {
                dispatch(
                    'setMessage',
                    {
                        value: error(e.response.data.error.message),
                        type: 'danger'
                    },
                    { root: true }
                )
                throw new Error(e.message)
            }
        },
        logout({ commit }) {
            commit('removeToken')
        }
    },
    getters: {
        token(state) {
            return state.token
        },

        isAuthenticated(_, getters) {
            return !!getters.token
        }
    }
}
