export const get404Page = (req, res, next) => {
  res.status(404).render("404Page", {
    pageTitle: "Page Not Found",
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const get500Page = (req, res, next) => {
  res.status(500).render("500Page", {
    pageTitle: "Server Error",
    isAuthenticated: req.session.isLoggedIn,
  });
};
