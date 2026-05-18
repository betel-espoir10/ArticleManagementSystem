exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  return res.render("access-denied", {
    message: "Only admin can manage articles",
  });
};

exports.isUser = (req, res, next) => {
  if (
    req.session.user &&
    (req.session.user.role === "user" || req.session.user.role === "admin")
  ) {
    return next();
  }
  return res.render("access-denied", {
    message: "Only admin can manage articles",
  });
};
