export const getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split(";")[3].trim().split("=")[1];
  res.render("auth/login", {
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

export const postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
