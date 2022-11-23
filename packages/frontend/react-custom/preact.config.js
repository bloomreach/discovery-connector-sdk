import webpackConfig from 'preact-cli';

/**
 * Custom Webpack config for preact
 * @type {{module: {rules: [{test: RegExp, use: string[]}]}}}
 */
webpackConfig.module = {
        rules: [
            {
                test: /\.css$/,
                loader: 'typings-for-css-modules-loader?modules',
                options: {
                    esModule: true,
                    import: true,
                    modules: true,
                    namedExport: true,

                },
            }
        ],
};
