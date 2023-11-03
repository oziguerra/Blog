import express from "express";
import bodyParser from "body-parser";
import lodash from "lodash";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let startingContent = "<h1>Home</h1><p>Welcome to Oziel's blog!</p>"

let blogPosts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { 
        posts: blogPosts,
        startingContent : startingContent
    });
  });

  app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

  app.get("/contact", (req, res) => {
    res.render("contact.ejs");
  });

  app.get("/compose", (req, res) => {
    res.render("compose.ejs");
  });

  app.post("/submit", (req, res) => {
    blogPosts.push({
        title: req.body["postTitle"],
        body: req.body["postContent"],
    });
    res.render("index.ejs", { 
        posts: blogPosts,
        startingContent : startingContent
    });
  });

  app.get("/posts/:title", (req, res) => {
    const requestedTitle = req.params.title;
    
    blogPosts.forEach(post => {
        const postTitle = lodash.lowerCase(post.title);
        if(postTitle === requestedTitle){
            console.log("Found!")
            res.render("post.ejs", {
                title: post.title,
                content: post.body
            });
        }
    });
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});