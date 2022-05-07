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
    async getDetail({commit, state}, id) {  
        const {data} = await this.$axios.get('/' + id)
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
        console.log(state);
        return state.variables
    }
}