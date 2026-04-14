import { Module } from "asab_webui_components";

import { FilmsScreen } from "./FilmsScreen.jsx";
import { FilmDetailScreen } from "./FilmDetailScreen.jsx";

export default class FilmsApplicationModule extends Module {
  constructor(app, name) {
    super(app, "FilmsApplicationModule");

    app.Router.addRoute({
      path: "/films",
      end: false,
      name: "Films",
      component: FilmsScreen,
    });

    app.Router.addRoute({
      path: "/films/:id",
      end: false,
      name: "Film Detail",
      component: FilmDetailScreen,
    });

    app.Navigation.addItem({
      name: "Films",
      icon: "bi bi-film",
      url: "/films",
    });
  }
}
