import Router from 'universal-router';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import DefaultLayout from 'layouts/Default';

import AppStore from 'stores/App';
import UserStore from 'stores/User';
import PageIndexStore from 'stores/PageIndex';
import PageTestStore from 'stores/PageTest';

export default function (logger, pages) {

    var getApp = (context) => {

        if (context.di.app) {
            return context.di.app;
        }

        var store = new Vuex.Store(AppStore(context.di));
        store.state.di = context.di;

        store.registerModule('user', UserStore((context.di)));

        DefaultLayout.store = store;

        DefaultLayout.components = pages;

        var app = new Vue(DefaultLayout);

        return app;
    };

    return new Router([
        {
            path: '/',
            action: function (context) {

                return new Promise((resolve, reject) => {
                    var pageName = 'IndexPage';

                    var app = getApp(context);

                    if (app.$store.getters.hasPageName) {
                        app.$store.unregisterModule('page');
                    }

                    app.$store.registerModule('page', PageIndexStore(context.di));

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
            action: function (context) {

                return new Promise((resolve, reject) => {
                    var pageName = 'TestPage';

                    var app = getApp(context);

                    if (app.$store.getters.hasPageName) {
                        app.$store.unregisterModule('page');
                    }

                    app.$store.registerModule('page', PageTestStore(context.di));

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
