var VueRender = require('vue-server-renderer');

var template = require('app/Backend/templates/template.raw.pug');

export default function (di, app) {

    var logger = di.logger;

    app.use(function (req, res, next) {

        if (!req.vueComponent) {
            logger.error(new Error('no req.vueComponent on ' + req.path));
            return res.status(500).send('Server Error');
        }

        logger.debug(req.method, req.path, req.vueComponent.$options.name);

        var renderer = VueRender.createRenderer();

        renderer.renderToString(req.vueComponent, (error, html) => {

            if (error) {
                logger.error(error);
                return res.status(500).send('Server Error');
            }

            res.send(template.replace('<!--body-->', html));
        });

    });


}
