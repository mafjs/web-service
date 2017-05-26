import initRouter from 'routes';
import logger from 'loglevel';
import Config from 'maf-config';
import * as History from 'history';
import * as qs from 'qs';

import initApi from 'api';

var config = new Config();

var api = initApi(logger, config);

var di = {
    logger,
    config,
    api,
    app: null
};


import IndexPage from 'pages/Index';
import TestPage from 'pages/Test';

var pages = {
    IndexPage,
    TestPage
};

var router = initRouter(logger, pages);

var context = {
    path: window.location.pathname,
    query: window.location.search,
    di: di
};

router.resolve(context)
    .then((app) => {
        di.app = app;
        app.$mount('._body');
    })
    .catch((error) => {
        logger.error(error);
    });


api.get('history').listen((location) => {
    router.resolve({
        path:location.pathname,
        query: qs.parse(location.search.replace(/^\?/, '')),
        di: di
    })
    .then(() => {
        logger.info('route done');
    })
    .catch((error) => {
        logger.error(error);
    });
});
