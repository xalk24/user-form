module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/vars.scss";
        `,
      },
    },
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3001/',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
