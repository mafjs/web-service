import Router from 'universal-router';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import DefaultLayout from 'layouts/Default';

import AppStore from 'stores/App';
import UserStore from 'stores/User';
import PageIndexStore from 'stores/PageIndex';

export default function (logger, pages) {

    return new Router([
        {
            path: '/',
            action: function () {

                return new Promise((resolve, reject) => {
                    var store = new Vuex.Store(AppStore);

                    store.registerModule('user', UserStore);
                    store.registerModule('page', PageIndexStore);

                    DefaultLayout.store = store;

                    var pageName = 'IndexPage';

                    DefaultLayout.components = pages;

                    // DefaultLayout.components = {
                    //     [pageName]: pages[pageName]
                    // };

                    var app = new Vue(DefaultLayout);

                    app.$store.dispatch('init', pageName)
                    .then(() => {
                        return app.$store.dispatch('page/init');
                    })
                    .then(() => {
                        resolve(app);
                    })
                    .catch((error) => {
                        reject(error);
                    });

                });

            }
        },

        {
            path: '/test',
            action: function () {

                return new Promise((resolve, reject) => {
                    var store = new Vuex.Store(AppStore);

                    store.registerModule('user', UserStore);
                    store.registerModule('page', PageIndexStore);

                    DefaultLayout.store = store;

                    var pageName = 'TestPage';

                    DefaultLayout.components = {
                        [pageName]: pages[pageName]
                    };

                    var app = new Vue(DefaultLayout);

                    app.$store.dispatch('init', pageName)
                    .then(() => {
                        return app.$store.dispatch('page/init');
                    })
                    .then(() => {
                        resolve(app);
                    })
                    .catch((error) => {
                        reject(error);
                    });

                });

            }
        },

    ]);

}
