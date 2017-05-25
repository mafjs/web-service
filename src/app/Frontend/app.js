import initRouter from 'routes';
import logger from 'loglevel';
import Config from 'maf-config';
import * as History from 'history';

var config = new Config();

var di = {
    logger,
    config
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
    .then((vueComponent) => {
        vueComponent.$mount('._body');
    })
    .catch((error) => {
        logger.error(error);
    });

var history = History.createBrowserHistory();

history.listen(function (location) {

    router.resolve({
        path: location.pathname,
        query: location.search
    });

            // .then((a, b, c) => {
            //     debugger;
            // })
            // .catch((error) => {
            //     debugger;
            // });

});


setTimeout(function () {
    history.push('/test');
}, 3000);
