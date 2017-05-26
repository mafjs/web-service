export default (di) => {
    return {

        state: {
            meta:{
                title: ''
            },
            pageName: null
        },

        getters: {
            hasPageName: (state) => {
                return typeof state.pageName === 'string';
            }
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

            'navigate': function (store, event) {

                if (event) {
                    event.preventDefault();
                }

                var trgt = (event.currentTarget) ? event.currentTarget : event.target;

                di.api.get('history').push(trgt.pathname + trgt.search);

            }
        }

    };

};
