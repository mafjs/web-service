import * as History from 'history';

export default class HistoryApi {

    constructor (logger) {
        this._logger = logger;
        this._history = History.createBrowserHistory();
    }

    push (url) {
        return this._history.push(url);
    }

    listen (cb) {
        return this._history.listen(cb);
    }
}
