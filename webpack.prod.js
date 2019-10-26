const commonConfig = require("./webpack.common");
const ExtractTextPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const plugins = [
    ...commonConfig.plugins,
    new ExtractTextPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css",
    }),
    new WebpackCleanupPlugin(),
];

const minimizer = [
    new TerserPlugin({
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
    }),
];

const splitChunks = {
    cacheGroups: {
        // Split vendor code to its own chunk(s)
        vendors: {
            test: /[\\/]node_modules[\\/]/i,
            chunks: "all",
        },
        // Split code common to all chunks to its own chunk
        commons: {
            name: "commons", // The name of the chunk containing all common code
            chunks: "initial", // TODO: Document
            minChunks: 2, // This is the number of modules
        },
    },
};
const optimization = {
    minimizer,
    splitChunks,
    runtimeChunk: {
        name: "runtime",
    },
    nodeEnv: "production",
    minimize: true,
};

const config = { ...commonConfig, optimization, plugins };

module.exports = config;
