module.exports = function (di, server) {

    return new Promise((resolve) => {

        var signals = {
            'SIGINT': 2,
            'SIGTERM': 15
        };

        var connections = {};


        server.on('connection', function (connection) {

            var key = connection.remoteAddress + ':' + connection.remotePort;

            connections[key] = connection;

            connection.on('close', function () {
                delete connections[key];
            });

        });

        function shutdown (signal, value) {

            var promises = [];

            promises.push(new Promise((resolve, reject) => {

                di.logger.info('stopping http server');

                server.close(function () {
                    di.logger.info('http server stopped by ' + signal);
                    resolve();
                });

                server.getConnections(function (error, count) {

                    di.logger.info(`http server: destroy ${count} connections`);

                    for (var key in connections) {
                        connections[key].destroy();
                    }

                });

            }));

            Promise.all(promises)
                .then(() => {
                    di.logger.info('shutdown complete');
                    process.exit(128 + value);
                })
                .catch((error) => {
                    di.logger.error(error);
                    process.exit(128 + value);
                });

        }


        Object.keys(signals).forEach(function (signal) {

            process.on(signal, function () {
                di.logger.info(`CATCH SIGNAL ${signal}`);
                shutdown(signal, signals[signal]);
            });

        });

        resolve(server);
    });

};
