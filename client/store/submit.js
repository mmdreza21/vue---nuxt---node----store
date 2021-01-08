const _ = require("lodash");

export const state = () => ({
  user: [],
  err: ""
});
export const getters = {
  getErr(state) {
    return state.err;
  },
  getUser(state) {
    return state.user;
  }
};
export const mutations = {
  setErr(state, err) {
    state.err = err;
  },
  setuser(state, user) {
    state.user = user;
  },

};

export const actions = {
  async postuser(context, user) {
    try {
      const { data } = await this.$axios.post("/user", user);

      return Promise.resolve(data);
    } catch (error) {
      context.commit("setErr", error.response.data);
      return Promise.reject(error);
    }
  },
  async getuserserver(context, user) {
    try {
      // console.log(user);
      const { data } = await this.$axios.get(`/user/${user._id}`)
      // console.log(data);
      context.commit("setuser", data)
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  },
  async editUserAct({ commit }, user) {
    try {
      const { data } = await this.$axios.put(`/user/${user._id}`, user.user)
      commit('setuser', data)
      return Promise.resolve()
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  }
};
