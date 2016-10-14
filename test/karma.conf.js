var webpackConf = require('../build/base');

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        reporters: ['spec'],
        files: ['./index.js'],
        plugins: [
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-spec-reporter',
            'karma-webpack'
        ],
        preprocessors: {
            './index.js': ['webpack']
        },
        webpack: webpackConf,
        webpackMiddleware: {
            noInfo: true
        },
        singleRun: true
    })
};
