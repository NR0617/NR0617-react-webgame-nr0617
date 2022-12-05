const path = require("path");
//const { webpack } = require("webpack");
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    name: "wordrelay-settings",
    mode: "development", //실서비스: production
    devtool: "eval", //실서비스: hidden-source-map
    resolve: {
        extensions: [".js", ".jsx"],
    },

    entry: {
        app: ["./client"],
    }, //입력

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        //플러그인을 모아놓은 곳
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    browsers: [
                                        "> 5% in KR",
                                        "last 2 chrome versions",
                                    ],
                                },
                            },
                        ],
                        "@babel/preset-react",
                    ],
                    plugins: ["react-refresh/babel"],
                },
            },
        ],
    },
    plugins: [
        new LoaderOptionsPlugin({ debug: true }),
        new ReactRefreshWebpackPlugin(),
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js",
    }, //출력
    devServer: {
        devMiddleware: { publicPath: "/dist" }, //가상경로
        static: { directory: path.resolve(__dirname) }, //실제경로
        hot: true,
    },
};
