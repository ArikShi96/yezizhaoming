module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/xxx": {
        target: "http://xxx.com",
        changeOrigin: true, // 允许websockets跨域
      },
    }, // 代理转发配置，用于调试环境
  },
};
