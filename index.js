import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    let blogPosts = [
        {
            title: 'Who am I?',
            body: '...',
            author: 'Oziel Guerra',
            publishedAt: new Date('2016-03-19'),
            createdAt: new Date('2016-03-19')
        },];
        res.render("index.ejs", { posts: blogPosts });
  });

  app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

  app.get("/contact", (req, res) => {
    res.render("contact.ejs");
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});