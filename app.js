//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
const mongoose = require('mongoose');
var exports = module.exports = {};

const blogStartingContent = "This blog is to review all Thai restuarant in Michigan that I visited. Also, the Asian market where I find all cooking ingredients in Grand Rapids, Michigan. Below is the list of each blog. Please click to navigate to more details of each blog. Thanks!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const recipeContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

//set up the view engine to connect to view folder for all .ejs code for frontend
app.set('view engine', 'ejs');

//body parser to pass the request from the UI
app.use(bodyParser.urlencoded({extended: true}));

//use public deirectory to store static files i.e. css or images
app.use(express.static("public"));

//setup mongoDB to port 27017
mongoose.connect("mongodb+srv://admin-mai:Mai_123456@cluster0-wqtye.mongodb.net/MaiThaiBlog", {useNewUrlParser: true});
//create global variables
// posts is an array of post object which has 2 key-value pairs
// 1. title (key) : req.body.postTitle (value)
// 2. content (key) : req.body.postBody (value)
//create new schema called "post"
const postSchema = {
  title: String,
  content: String
};

//create new model: Capitalized-and-singular word =
const Post = mongoose.model("Post",postSchema);

//var posts = []; //empty array that have nothing inside -to save all available posts
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/authenticRecipe", function(req, res) {
  res.render("authenticRecipe", {
    recipeContent: recipeContent //don't need this, but this is the way to pass on the informatio from app.js to .ejs page
  });
});

app.get("/fusionCuisine", function(req, res) {
  res.render("fusionCuisine");
});

app.get("/maiThaiSpecial", function(req, res) {
  res.render("maiThaiSpecial");
});

app.get("/about", function(req, res) {
  res.render("about");
});

//GET verb to READ this data that are there, recorded on the database
app.get("/blog", function(req, res) {
  Post.find({}, function(err, posts){
    //send the response back to client
    if(!err){
    res.render("blog", {
      startingContent: blogStartingContent,
      posts: posts
      });
    }else{
      res.send(err);
    }
  });
});

//////////////////////////AJAX calls//////////////////
app.get('/ajaxCall',function(req,res){
      res.render("ajaxLoadPost");
});

app.get('/ajaxCalljson',function(req,res){
  Post.find({},function(err,posts){
    if(!err){
      console.log(posts);
      res.send(posts);
    }
  });
});

//////////////////////////Compose Blogs//////////////////////////////
//app.get("/compose", );
//app.post("/compose", );
//Refactor code for the same route "/compose"
app.route("/compose")
  .get(function(req, res){
    res.render("compose");
  })
//POST verb to CREATE data on the database from client
  .post(function(req, res){
    console.log(req.body.postContent);
    console.log(req.body.postTitle);
    //create data inside mongoDB
    const post = new Post({
      //body parser to retrieve data from database
      title: req.body.postTitle,
      content: req.body.postContent
    });
    //save data on the mongoDB
    post.save(function(err){
      if (!err){
        console.log("Successfully added a new articles.");
        res.redirect("/blog");
      }else{
        console.log("Error to save data in mongoDB")
      }
    });
});

///////////////////////Read POST for specific PostID/////////////////////////
//GET verb to READ this data that are there, recorded on the database where id = requestedPostId
app.get("/posts/:postId", function(req, res){
  //console.log("Entering get");
const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, foundPost){
    if(foundPost){
      res.render("foundPost", {
        //key:value pair
        //key is variable on the ejs template and value is variable this app.js
        //in this case, value foundPost.title is what retrieved from MongoDB
        title: foundPost.title,
        content: foundPost.content,
        id: foundPost._id,
      });
    }else{
      res.send("No Post matching that ID");
    }
  });
});

////////////////////Update POST for specific PostID: Using PUT method//////////////////////////
app.get("/posts/update/:postId",function(req,res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, updatePost){
    if(updatePost){
      res.render("updatePost", {
        title: updatePost.title,
        content: updatePost.content,
        id: updatePost._id
      });
    }else{
      res.send("No Post matching that ID");
    }
  });
});

app.post("/posts/update/:postId",function(req,res){
    const requestedPostId = req.params.postId;
    //console.log(requestedPostId);
    //console.log(req.body.postTitle);
    //console.log(req.body.postContent);
    const newPost = {title: req.body.postTitle, content: req.body.postContent}
    //console.log(newPost);
    Post.findOneAndUpdate(
      {_id: requestedPostId}, //condition
      {$set: newPost}, //Insert new data
      function(err, newPost){
      if(!err){
        res.render("successUpdatePost",{
          title:newPost.title,
          id:newPost._id
        });
        console.log(newPost);
      }
    });
});

//delete all the posts that recorded in the database
app.delete('/posts/delete/:postId', (req, res) => {
    Todo.deleteOne({ _id: req.params.postId })
    .then(() => {
        res.json({ success: true });
    })
    .catch(err => {
        res.status.json({ err: err });
    });
});



////////////////////////////////SIGN UP page///////////////////////////////////////////////////////
//Sign Up page for signup button route "/signUp"
app.get("/signUp", function(req, res) {
  res.render("signUp");
});

//POST request get called on your home route "/"
app.post("/signUp", function(req, res) {
   //need bodyParser package to pass on variable to assign to use in this .js app
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  //data that passed into MailChimp
  var data = {
    //array [] of object {}
    members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields:{
            FNAME:firstName,
            LNAME:lastName
          }
        }
    ]
  };

  var jsonData = JSON.stringify(data);
  var options = {
    //url that we want to send our request to
    url: "https://us20.api.mailchimp.com/3.0/lists/e5ca79f9d5",
    //how we want our request to be process
    method: "POST",
    //add authenrization to get rid of 401
    headers:{
      "Authorization": "mai1 b85ac78529fb0d1670586a04f844b753-us20"
    },
    //content of the data
    body: jsonData
  };
  request(options, function(error, response, body) {
    if (error) {
      //console.log(error);
      res.render("failure");
    } else {
      //console.log(response.statusCode); //send status code back from MailChimp
      if(response.statusCode === 200){
        res.render("success");
      }else{
        res.sendFile("failure");
      }
    }
  });
  //console.log(firstName, lastName, email);
});

//POST request get called on the /failure route
app.post("/failure", function(req,res){
  //redirect user to the Home route
  res.redirect("/home");
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3030;
}

var server = app.listen(port, function() {
  console.log("Server started on port 3030");
});

exports.closeServer = function(){
  console.log("closeServer");
  server.close();
};
