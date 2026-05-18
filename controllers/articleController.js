const { name } = require("ejs");
const { Article } = require("../models");
const fs = require("fs");
const path = require("path");
const Category = require("../models/categoryModel");

//GET ALL ARTICLES
exports.getHome = async (req, res) => {
  const articles = await Article.findAll({ include: [Category] });
  return res.render("list", { articles, session: req.session });
};

// GET ADD ARTICLE PAGE
exports.getAddArticle = async (req, res) => {
  const categories = await Category.findAll();
  res.render("articles", { categories });
};

// POST ADD ARTICLE
exports.postAddArticle = async (req, res) => {
  const { name, brand, categoryId, content, price, stock } = req.body;

  const picture = req.file ? req.file.filename : null;
  try {
    await Article.create({
      name,
      brand,
      categoryId: req.body.category,
      content,
      price,
      stock,
      picture,
    });

    res.redirect("/list");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error add article");
  }
};

// GET EDIT PAGE
exports.getEdit = async (req, res) => {
  const article = await Article.findByPk(req.params.id, {
    include: Category,
  });
  const categories = await Category.findAll(); // for select
  res.render("edit", { article, categories });
};

//POST UPDATE ARTICLE
exports.postUpdate = async (req, res) => {
  try {
    const id = req.params.id;

    const article = await Article.findByPk(id);
    if (!article) return res.send("Article found !");

    let picture = article.picture;

    if (req.file) {
      if (article.picture) {
        const oldPath = path.join(__dirname, "../uploads", article.picture);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      picture = req.file.filename;
    }

    await article.update({
      name: req.body.name,
      brand: req.body.brand,
      categoryId: req.body.categoryId,
      content: req.body.content,
      price: req.body.price,
      stock: req.body.stock,
      picture,
    });

    res.redirect("/list");
  } catch (error) {
    console.log(error); // debug
    res.status(500).send("Erreur update");
  }
};

//DELETE ARTICLE
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) return res.send("Article introuvable");

    //delete picture
    if (article.picture) {
      const filePath = path.join(__dirname, "../uploads", article.picture);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await article.destroy();

    res.redirect("/list");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error delete !");
  }
};
