const path = require('path');

module.exports = {
    title: 'Vue Query Builder',
    description: 'A UI component for building complex queries with nested conditionals.',
    base: '/vue-query-builder/',

    themeConfig: {
        nav: [
        ],

        repo: 'dabernathy89/vue-query-builder',
        docsDir: 'docs',
        docsBranch: 'gh-pages',
        editLinks: true,

        sidebar: [
            ['/', 'Introduction'],
            ['/demos', 'Demos'],
            ['/getting-started', 'Getting Started'],
            ['/configuration', 'Configuration'],
            ['/custom-templates', 'Custom Templates'],
            ['/roadmap', 'Roadmap'],
            ['/contributing', 'Contributing'],
            ['/about', 'About'],
        ]
    },

    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             bootstrap: path.resolve(__dirname, 'node_modules/bootstrap'),
    //         }
    //     }
    // }

    // module.exports = {
    //   ...
    //   module: {
    //     rules: [{
    //       test: /\.less$/,
    //       loader: 'less-loader' // compiles Less to CSS
    //     }]
    //   }
    // };
}