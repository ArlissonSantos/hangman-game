class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = "";
    this.init();
  }

  route(path, viewPath) {
    this.routes[path] = viewPath;
  }

  init() {
    window.addEventListener("popstate", () => {
      this.handleRoute();
    });

    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-route]")) {
        e.preventDefault();
        const route = e.target.getAttribute("data-route");
        this.navigate(route);
      }
    });

    this.handleRoute();
  }

  navigate(path) {
    window.history.pushState({}, "", path);
    this.handleRoute();
  }

  async handleRoute() {
    const path = window.location.pathname || "/";
    const route = this.routes[path] || this.routes["/login"]; // fallback para login

    if (route) {
      await this.loadView(route);
    }
  }

  async loadView(viewPath) {
    try {
      const response = await fetch(viewPath);
      const html = await response.text();

      const app = document.getElementById("app");
      app.innerHTML = html;

      this.currentRoute = viewPath;
    } catch (error) {
      console.error("Erro ao carregar view:", error);
      document.getElementById("app").innerHTML =
        '<div class="p-6 text-center text-red-600">Erro ao carregar página</div>';
    }
  }
}

window.router = new Router();
