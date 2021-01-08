export const state = () => ({
    orders: []
});
export const getters = {
    getOrder(state) {
        return state.orders;
    }
};
export const mutations = {
    setOrder(state, product) {

        state.orders = product;
    },
    addOrder(state, order) {

        state.orders.push(order)
    },
    delete(state, deleed) {
        const index = state.orders.findIndex(d => d._id === deleed._id)

        state.orders.splice(index, 1)
    }

};

export const actions = {
    async getOrderserver(context, userId) {
        try {

            const { data } = await this.$axios.get(`/order/${userId._id}`);
            // console.log(data);s
            // console.log(data);
            context.commit("setOrder", data);

            // return data;
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    },
    async sendOrder({ commit }, order) {
        try {
            const { data } = await this.$axios.post("/order", order)
            // console.log(data);
            commit("addOrder", order)
        } catch (e) {
            console.log(e);
            console.log(e.response.data);
        }
    },
    async deleteorder({ commit }, order) {
        try {
            console.log(order);
            const { data } = await this.$axios.delete(`/order/${order._id}`)
            commit("delete", order)

        } catch (e) {
            console.log(e);
            console.log(e.response.data);
        }


    }
};
