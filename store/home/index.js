export const state = () => ({
    client : null,
    variables : null
})

export const mutations = {
    setClient(state, data) {
        state.client = data
    },
    setVariables(state, data) {
        state.variables = data
    }
}

export const actions = {
    async getDetail({commit}, id) {  
        const {data} = await this.$axios.get('https://m.bot-marketing.com/api/public/tunnelSessions/J6h4OY3M')
        const {client} = data
        commit('setClient', client)
        commit('setVariables', data.variables)
        return data
    }
}

export const getters = {
    getClient(state) {
        return state.client
    },
    getVariables(state) {
        return state.variables
    }
}