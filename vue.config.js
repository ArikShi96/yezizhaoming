module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "https://dengshi.yuejike.com",
        changeOrigin: true, // 允许websockets跨域
      },
      "/cdn/upload": {
        target: "https://dengshi.yuejike.com",
        changeOrigin: true, // 允许websockets跨域
      },
      "/oauth/wxOauth": {
        target: "https://dengshi.yuejike.com",
        changeOrigin: true, // 允许websockets跨域
      },
    }, // 代理转发配置，用于调试环境
  },
};
