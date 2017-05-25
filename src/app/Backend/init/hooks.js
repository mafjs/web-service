var hook = require('node-hook');

hook.hook('.pug', function (source, filename) {

    if (filename.match(/\.raw\.pug$/)) {
        return `module.exports = '${source}';`;
    }

    return `
    var compiler = require('vue-template-compiler');
    var rendered = compiler.compile('${source}');

    var toFunction = function (code) {
        return 'function(){' + code + '}';
    };

    module.exports = function (options) {

        eval("options.render = function (){" + rendered.render + "};");

        eval("options.staticRenderFns = [" + rendered.staticRenderFns.map(toFunction).join(',') + "]");

        delete options.template;
        return options;
    };
    `;

});

export default function () {}
