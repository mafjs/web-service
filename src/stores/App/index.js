export default {

    state: {
        meta:{
            title: ''
        },
        pageName: null
    },

    mutations: {
        pageName: function (state, pageName) {
            state.pageName = pageName;
        },
        meta: function (state, meta) {
            for (var name in meta) {
                state.meta[name] = meta[name];
            }
        }
    },

    actions: {
        init: function (store, pageName) {

            return new Promise((resolve, reject) => {
                store.commit('pageName', pageName);
                resolve();
            });

        },
        setMeta: function (store, meta) {
            store.commit('meta', meta);
        },

        navigate: function (url) {
            
        }
    }

};
