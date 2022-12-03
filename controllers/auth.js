export const getLogin = (req, res, next) => {
  //   const isLoggedIn = req.get("Cookie").split(";")[3].trim().split("=")[1];
  res.render("auth/login", {
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

export const postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};
