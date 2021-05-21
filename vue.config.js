const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

// console.log("当前所接入服务地址1----->", process.env.VUE_APP_DATASERVER1);

const externals = {
  // vue: "Vue",
  // "vue-router": "VueRouter",
  // echarts: "echarts",
  // xlsx: "XLSX"
  // mockjs: "Mock"
};
const cdn = {
  css: [],
  js: [
    // "https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js",
    // "https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js",
    // "https://cdn.bootcdn.net/ajax/libs/echarts/4.9.0-rc.1/echarts.min.js",
    // "https://cdn.bootcdn.net/ajax/libs/xlsx/0.16.7/xlsx.min.js"
    // "https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock-min.js"
  ]
};

const isProduction = process.env.NODE_ENV === "production";

// 开发环境是否使用CDN
const devUseCDN = false;

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true,
  productionSourceMap: false,

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    // 路径别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@public", resolve("public"));

    if (isProduction || devUseCDN) {
      config.plugin("html").tap(args => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },

  configureWebpack: config => {
    if (isProduction || devUseCDN) {
      config.externals = externals;
    }
  },

  css: {
    // 是否开启css分离 在开发环境开启会导致热更新异常
    extract: isProduction ? true : false,
    loaderOptions: {
      scss: {
        prependData: '@import "@/scss/variables.scss";'
      }
    }
  },

  devServer: {
    // host: "0.0.0.0",
    port: "9834",
    hot: true,
    // open: true,
    // logLevel: "debug",
    // 错误、警告在页面弹出
    // overlay: {
    //   warning: false,
    //   error: true
    // }
    // proxy: {
    //   "/Ep_fastmock": {
    //     target:
    //       "https://www.fastmock.site/mock/126581e68fcaca6927fdfbf68e6aed5c",
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  }
};
