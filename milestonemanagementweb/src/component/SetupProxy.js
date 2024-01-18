const { createProxyMiddleware } = require("http://127.0.0.1:5173");
const { default: baseURL } = require("../api");

module.exports = function (app) {
  app.use(
    "/v1/user",
    createProxyMiddleware({
      target: `${baseURL}`,
      changeOrigin: true,
    })
  );
};
