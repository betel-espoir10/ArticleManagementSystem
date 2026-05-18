// controllers/userController.js
const { User } = require("../models");
const bcrypt = require("bcrypt");

// Display login form
exports.getLogin = (req, res) => {
  return res.render("login", { error: null });
};

// Login ou inscription
exports.postLogin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!email || !password) {
      return res.render("login", { error: "Champs requis !" });
    }

    let user = await User.findOne({ where: { email } });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.render("login", { error: "Mot de passe incorrect" });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: "user",
      });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    return res.redirect("/list");
  } catch (error) {
    console.log("ERREUR :", error);
    return res.render("login", { error: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  const users = await User.findAll();
  return res.render("users", { users });
};

exports.getRegister = async (req, res) => {
  return res.render("register");
};

//POST REGISTER
exports.postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verified field
    if (!username || !email || !password) {
      return res.send("Tous les champs sont obligatoires");
    }

    // Verified if email already exist
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.send("Email déjà utilisé");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user", // user always secure
    });

    //Redirection
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error during registration !");
  }
};

// log out
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
