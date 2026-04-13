import { Module } from "asab_webui_components";

import { DetailScreen } from "./DetailScreen.jsx";

export default class DetailApplicationModule extends Module {
  constructor(app, name) {
    super(app, "DetailApplicationModule");

    app.Router.addRoute({
      path: "/detail/:id",
      end: false,
      name: "Detail",
      component: DetailScreen,
    });

    // app.Navigation.addItem({
    //   name: "Detail",
    //   icon: "bi bi-table",
    //   url: "/detail/:id",
    // });
  }
}
