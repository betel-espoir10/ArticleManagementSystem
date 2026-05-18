const { Feedback, User, Article } = require("../models");

//LIST FEEDBACKS INCLUDIND ATTRIBUTES
exports.getHome = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: [
        { model: User, as: "users", attributes: ["username"] },
        { model: Article, as: "articles", attributes: ["name"] },
      ],
    });

    res.render("list-feed", { feedbacks });
  } catch (error) {
    console.log(error);
    res.status(500).send(" Display feedback error !");
  }
};

//GET ADD FEEDBACK PAGE
exports.getAddFeedBack = async (req, res) => {
  try {
    const articles = await Article.findAll();

    res.render("feedback", {
      articles: articles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error feedback loading... ");
  }
};

//POST FEEDBACK
exports.postFeedBack = async (req, res) => {
  try {
    const { rating, comment, articleId } = req.body;
    const user = req.session.user;

    if (!user) return res.redirect("/list-feed");

    if (!rating || !comment) {
      return res.send("Require every files");
    }

    if (rating < 1 || rating > 5) {
      return res.send("The rating must to be between 1 and 5 !");
    }

    await Feedback.create({
      rating,
      comment,
      userId: user.id,
      articleId: articleId,
    });

    res.redirect("/list-feed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error feedback didn't add ! ");
  }
};

//DELETE FEEDBACK
exports.deleteFeedBack = async (req, res) => {
  try {
    await Feedback.destroy({
      where: { id: req.params.id },
    });

    res.redirect("/list-feed");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error! You can't delete !");
  }
};
