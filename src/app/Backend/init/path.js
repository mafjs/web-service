var path = require('path');

process.env.NODE_PATH = process.env.NODE_PATH || '';
process.env.NODE_PATH = process.env.NODE_PATH + path.delimiter + path.resolve(__dirname, '..', '..', '..');
require('module').Module._initPaths();

console['log']('NODE_PATH', process.env.NODE_PATH);

export default function () {}
