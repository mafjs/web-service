export default {

    namespaced: true,

    state: {
        authorized: false,
        login: 'no'
    },

    mutations: {
        'login': function (state, user) {
            state.authorized = true;
            state.login = user.login;
        }
    },

    actions: {
        setUser: function (store, user) {
            store.commit('login', user);
        }
    }

};
