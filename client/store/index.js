export const state = () => ({});

export const actions = {
  async nuxtServerInit(vuexcontext, context) {
    try {

      const pro = await context.app.$axios.get(`/item/all`);
      vuexcontext.commit("product/setProduct", pro.data);

      const slider = await context.app.$axios.get(`/item/slider`)
      vuexcontext.commit("tags/setSlider", slider.data);

      const most = await context.app.$axios.get(`/item/most`)
      vuexcontext.commit("tags/setMost", most.data);

      const newst = await context.app.$axios.get(`/item/newst`)
      vuexcontext.commit("tags/setNewst", newst.data);


      //   console.log(data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  }
};
