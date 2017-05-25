var api = {
    getSome: function () {

        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve('lorem ipsum lorem');
            }, 200);
        });

    }
};

export default {
    namespaced: true,

    state: {
        text: ''
    },

    mutations: {
        text: function (state, text) {
            state.text = text;
        }
    },

    actions: {
        init: function (store) {

            return api.getSome()
                .then((text) => {
                    store.commit('text', text);
                });

        }
    }
};
