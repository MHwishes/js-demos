import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Provider } from "react-redux";
import routes from "../routers";
import store from "../store/store";

const app = express();
// 前端打包完的 静态资源，通过这个就可以取到public 下的静态资源了
app.use(express.static("public"));

const render = (req, store) => {
  const App = (
    <Provider store={store}>
      <StaticRouter location={req.path}>{renderRoutes(routes)}</StaticRouter>
    </Provider>
  );

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    </head>
    <body>
    <div id="app">${renderToString(App)}</div>
    <script src="/index.js"></script>
    </body>
    </html>
    `;
  return html;
};

app.get("*", (req, res) => {
  const promises = matchRoutes(routes, req.path).map(({ route }) => {
    const component = route.component;
    return component.getInitialData ? component.getInitialData(store) : null;
  });

  Promise.all(promises).then(() => {
    const html = render(req, store);
    res.send(html);
  });
});

app.listen(3000, () => console.log("Exampleapp listening on port 3000!"));
