const _ = require("lodash");

export const state = () => ({
    slider: [],
    most: [],
    newst: []
});
export const getters = {
    getSlider(state) {
        return state.slider;
    },
    getMost(state) {
        return state.most;
    }
    ,
    getNewst(state) {
        return state.newst;
    }
}
export const mutations = {
    setSlider(state, slider) {
        state.slider = slider;
    },
    setMost(state, most) {
        state.most = most
    },
    setNewst(state, most) {
        state.newst = most
    }
};

export const actions = {

};
