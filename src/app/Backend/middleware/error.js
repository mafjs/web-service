export default function (di, app) {

    var logger = di.logger;

    app.use(function (error, req, res, next) {

        if (error.status === 404) {
            return res.status(404).send('Not Found');
        }

        error.message += ' => request ' + req.path;

        logger.error(error);

        res.status(500).send('Server Error');

    });

}
