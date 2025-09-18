document.addEventListener("DOMContentLoaded", () => {
  router.route("/", "views/login.html");
  router.route("/login", "views/login.html");
  router.route("/register", "views/register.html");
  router.route("/main", "views/main.html");
  router.route("/play", "views/play.html");

  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    router.navigate("/login");
  }
});
