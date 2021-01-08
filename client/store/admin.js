export const state = () => ({
  cat: []
});
export const getters = {
  getcat(state) {
    return state.cat;
  }
};
export const mutations = {
  setcat(state, product) {
    state.cat = product;
  }
};

export const actions = {
  async getcat(context, cat) {
    try {
      const { data } = await this.$axios.get("/cat");
      context.commit("setcat", data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
};
