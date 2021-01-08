const _ = require("lodash");

export const state = () => ({
  product: [],
  error: "",

});
export const getters = {
  getProduct(state) {
    return state.product;
  },
  getError(state) {
    return state.error;
  }
};
export const mutations = {
  setProduct(state, product) {
    state.product = product;
  },
  addpost(state, product) {
    state.product.push(product);
  },
  edit(state, editedpost) {
    const postIndex = state.product.findIndex(
      post => post._id === editedpost._id
    );
    state.product[postIndex] = editedpost;
  },
  delet(state, deleted) {
    const Index = state.product.findIndex(pro => pro._id == deleted._id);
    state.product.splice(Index, 1);
  },
  setError(state, err) {
    state.error = err;
  }
};

export const actions = {
  async sendProduct({ commit }, pro) {
    try {
      const { data } = await this.$axios.post("/item", pro);

      commit("addpost", data);


    } catch (e) {
      console.log(e);
      commit(e.response.data);
      console.log(e.response.data);
    }
  },
  async editProduct(context, pro) {
    try {
      const { data } = await this.$axios.put(
        `/item/${pro._id}`,
        _.pick(pro, [
          "name",
          "isfree",
          "price",
          "numberInStok",
          "about",
          "tag",
          "image",
          "categoryId"
        ])
      );
      context.commit("edit", data);
      alert("!محصول مورد نظر با موفقیت ویرایش شد");
      return Promise.resolve();
    } catch (e) {
      context.commit("setError", e.response.data);
      alert("محصول ویرایش نشد شما باید دسته بندی را دوباره ست کنید  ");
      return Promise.reject(e.response.data);
    }
  },
  ///delet
  async deletProduct(context, pro) {
    try {
      const { data } = await this.$axios.delete(`/item/${pro._id}`, { ...pro });
      context.commit("delet", data);
      alert("!محصول مورد نظر با موفقیت حذف شد");
    } catch (e) {
      // context.commit(e);
      console.log(e);
    }
  },

};
