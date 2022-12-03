export const get404Page = (req, res, next) => {
  res.status(404).render("404Page", {
    pageTitle: "Page Not Found",
    isAuthenticated: req.session.isLoggedIn,
  });
};
