const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const crypto = require("crypto");

// DB
const db = require("./config/db");

// Routers
const articleRouter = require("./router/articleRouter");
const userRouter = require("./router/userRouter");
const feedbackRouter = require("./router/feedbackRouter");

// Middleware
const authMiddleware = require("./middlewares/authMiddleware");
const { Article } = require("./models");
const Category = require("./models/categoryModel");

const app = express();

// Create folder uploads automatical
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer for upload images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); //Recupere extension .jpg, .png, .jpeg
    cb(null, Date.now() + ext); //  garde extension
  },
});
const upload = multer({ storage: storage });

//SESSION
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// Global Middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", "./views");

//PARSE FORM DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));

//PAGE PAR DÉFAUT
app.get("/", (req, res) => {
  res.redirect("/login");
});

// PAGE ABOUT
app.get("/about", (req, res) => {
  res.render("about");
});

//CATEGORY
app.get("/category", (req, res) => {
  res.render("category");
});

app.post("/category", async (req, res) => {
  await Category.create({
    category: req.body.category,
    token: crypto.randomBytes(32).toString("hex"),
  });
  return res.redirect("/category");
});

// PUBLIC ROUTES
app.use("/", userRouter);

//PROTECTION (after login)
app.use("/", authMiddleware);

//PROTECTED ROUTES
app.use("/", articleRouter);
app.use("/", feedbackRouter);

//ASSOCIATION
Article.belongsTo(Category);
Category.hasMany(Article);

//DB SYNCHRONISATION
db.sync({ force: false });

//START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
