export default (di) => {
    return {
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

                store.commit('text', 'Hello Test Page');

            }
        }
    };

};
