const fs = require("fs");
const path = require("path");

// Constants
const PATHS = {
  dist: path.join(__dirname, "../../dist/"),
  src: path.join(__dirname, "../../src/"),
  public: path.join(__dirname, "../../public/"),
  nodeModules: path.join(__dirname, "../../node_modules/"),
};
const FILES_EXTENSIONS = {
  ts: /\.(ts|tsx)$/,
  js: /\.(js|jsx)$/,
  css: /\.css$/,
  cssModule: /\.module\.css$/,
  sass: /\.(scss|sass)$/,
  sassModule: /\.module\.(scss|sass)$/,
  images: /\.(png|svg|jpg|jpeg)$/,
  fonts: /\.(ttf$|woff$|woff2$)/,
};

// Functions-helpers
const getConfiguredCssLoader = () => ({
  loader: "css-loader",
  options: {
    modules: {
      localIdentName: "[local]__[contenthash]",
      mode: "local",
    },
  },
});

const getConfiguredBabelLoaderTS = (isProductionEnv, isDevelopmentEnv) => ({
  loader: require.resolve("babel-loader"),
  options: {
    customize: require.resolve("babel-preset-react-app/webpack-overrides"),
    presets: [
      [
        require.resolve("babel-preset-react-app"),
        {
          runtime: "classic",
        },
      ],
    ],
    babelrc: false,
    configFile: false,
    plugins: [
      isDevelopmentEnv && require.resolve("react-refresh/babel"),
    ].filter(Boolean),
    cacheDirectory: true,
    cacheCompression: false,
    compact: isProductionEnv,
  },
});

const getConfiguredBabelLoaderJS = () => ({
  loader: "babel-loader",
  options: {
    presets: [
      ["@babel/preset-env", { useBuiltIns: "entry", corejs: "core-js@3" }],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-object-rest-spread",
    ],
    cacheDirectory: true,
  },
});

const getDirectoriesInFolder = (dir) => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);
};

module.exports = {
  getConfiguredCssLoader,
  getConfiguredBabelLoaderJS,
  getDirectoriesInFolder,
  getConfiguredBabelLoaderTS,
  PATHS,
  FILES_EXTENSIONS,
};
