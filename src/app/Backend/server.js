/* eslint-disable */
import initPath from './init/path';
import initHooks from 'app/Backend/init/hooks';
/* eslint-enable */

import initConfig from 'app/Backend/init/config';
import initShutdown from 'app/Backend/init/shutdown';
import initRouter from 'routes';
import initApi from 'api';

import middleware from 'app/Backend/middleware';

var path = require('path');
var express = require('express');
var log4js = require('log4js-nested');

var logger = log4js.getLogger('maf-web-service');

var config = initConfig();

var api = initApi(logger, config);

var di = {
    logger,
    config,
    api
};

var app = express();

import IndexPage from 'pages/Index';
import TestPage from 'pages/Test';

var pages = {
    IndexPage,
    TestPage
};

var router = initRouter(logger, pages);

app.use('/static', express.static(path.resolve(__dirname + '/../../../public/static')));

app.use(function (req, res, next) {
    req.di = di;
    next();
});

app.use(function (req, res, next) {

    var context = {
        path: req.path,
        query: req.query,
        di: req.di
    };

    router.resolve(context)
        .then((vueComponent) => {
            // console.log(vueComponent.$store.state.meta);
            req.vueComponent = vueComponent;
            next();
        })
        .catch(next);
});

middleware.render(di, app);
middleware.error(di, app);

var host = config.get('host');
var port = config.get('port');

var server = app.listen(port, host, () => {
    logger.info(`listen on ${host}:${port}`);
});

initShutdown(di, server);
