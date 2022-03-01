const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin");
const {
  getConfiguredCssLoader,
  getConfiguredBabelLoaderJS,
  getConfiguredBabelLoaderTS,
  getDirectoriesInFolder,
  PATHS,
  FILES_EXTENSIONS,
} = require("./webpack-utils");

module.exports = (env, argv) => {
  const isDevelopmentEnv = argv.mode === "development";
  const isProductionEnv = !isDevelopmentEnv;
  const shouldUseSourceMap = isProductionEnv ? !!process.env.SOURCE_MAP : true;
  const styleLoader = isDevelopmentEnv
    ? "style-loader"
    : MiniCssExtractPlugin.loader;
  return {
    target: ["browserslist"],
    mode: argv.mode,
    bail: isProductionEnv,
    devtool: shouldUseSourceMap && "source-map",
    entry: {
      index: ["@babel/polyfill", path.join(PATHS.src, "index.tsx")],
    },
    output: {
      path: PATHS.dist,
      filename: "js/[name].[contenthash].bundle.js",
      chunkFilename: "js/[name].[contenthash].chunk.js",
      clean: true,
      publicPath: "/",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: getDirectoriesInFolder(PATHS.src).reduce((acc, item, index) => {
        if (index === 0) {
          acc.src = path.join(PATHS.src);
        }

        acc[item] = path.join(PATHS.src, `/${item}`);

        return acc;
      }, {}),
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
      minimize: isProductionEnv,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
    },
    module: {
      rules: [
        shouldUseSourceMap && {
          enforce: "pre",
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve("source-map-loader"),
        },
        {
          test: FILES_EXTENSIONS.ts,
          use: [
            getConfiguredBabelLoaderTS(),
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: FILES_EXTENSIONS.js,
          use: [getConfiguredBabelLoaderJS()],
        },
        {
          test: FILES_EXTENSIONS.css,
          exclude: FILES_EXTENSIONS.cssModule,
          use: [styleLoader, "css-loader"],
        },
        {
          test: FILES_EXTENSIONS.cssModule,
          use: [styleLoader, getConfiguredCssLoader()],
        },
        {
          test: FILES_EXTENSIONS.sass,
          exclude: FILES_EXTENSIONS.sassModule,
          use: [styleLoader, "css-loader", "sass-loader"],
        },
        {
          test: FILES_EXTENSIONS.sassModule,
          use: [styleLoader, getConfiguredCssLoader(), "sass-loader"],
        },
        {
          test: FILES_EXTENSIONS.images,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name].[hash:8][ext]",
          },
        },
        {
          test: FILES_EXTENSIONS.fonts,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[hash:8][ext]",
          },
        },
      ].filter(Boolean),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(PATHS.public, "/index.html"),
        favicon: path.join(PATHS.public, "/favicon.ico"),
        minify: isProductionEnv,
      }),
      new ReactRefreshWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/main.[contenthash].css",
        chunkFilename: "css/main.[contenthash].chunk.css",
      }),
      new ForkTsCheckerWebpackPlugin({
        async: isDevelopmentEnv,
        typescript: {
          typescriptPath: path.join(__dirname, "../node_modules/typescript"),
          configOverwrite: {
            compilerOptions: {
              sourceMap: shouldUseSourceMap,
              skipLibCheck: true,
              inlineSourceMap: false,
              declarationMap: false,
              noEmit: true,
              incremental: true,
              tsBuildInfoFile: PATHS.src,
            },
          },
          context: PATHS.src,
          diagnosticOptions: {
            syntactic: true,
          },
          mode: "write-references",
        },
        issue: {
          include: [
            { file: "../**/src/**/*.{ts,tsx}" },
            { file: "**/src/**/*.{ts,tsx}" },
          ],
          exclude: [
            { file: "**/src/**/__tests__/**" },
            { file: "**/src/**/?(*.){spec|test}.*" },
            { file: "**/src/setupProxy.*" },
            { file: "**/src/setupTests.*" },
          ],
        },
        logger: {
          infrastructure: "silent",
        },
      }),
      new ESLintPlugin({
        // Plugin options
        extensions: ["js", "mjs", "jsx", "ts", "tsx"],
        formatter: require.resolve("react-dev-utils/eslintFormatter"),
        eslintPath: require.resolve("eslint"),
        failOnError: !isDevelopmentEnv,
        context: PATHS.src,
        cache: true,
        cacheLocation: path.join(PATHS.nodeModules, ".cache/.eslintcache"),
        // ESLint class options
        cwd: PATHS.app,
        resolvePluginsRelativeTo: __dirname,
        baseConfig: {
          extends: [
            require.resolve("eslint-config-airbnb"),
            require.resolve("eslint-config-airbnb-typescript"),
          ],
          rules: {
            "react/react-in-jsx-scope": "warn",
          },
        },
      }),
    ],
    devServer: {
      port: 9000,
      open: true,
      historyApiFallback: true,
      static: {
        directory: PATHS.dist,
      },
    },
  };
};
