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

                return di.api.get('test').test()
                    .then((text) => {
                        store.commit('text', text);
                    });

            }
        }
    };

};
