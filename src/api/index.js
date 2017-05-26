import ServiceLocator from 'maf-service-locator';

import History from 'api/History';
import Test from 'api/Test';

export default (logger, config) => {

    var api = new ServiceLocator();

    api.set('history', () => {
        var history = new History(logger);

        return history;
    });

    api.set('test', () => {
        var test = new Test();

        return test;
    });

    return api;

};
