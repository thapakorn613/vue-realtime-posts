const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

const mongoURI = "mongodb://localhost:27017/mydb";
// const mongoURI =
//   "mongodb+srv://mongoartdb:mongoartdb@cluster0-ihcqr.mongodb.net/vue_express?retryWrites=true&w=majority";
// ? GET POSTS
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// ? ADD POST
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createAt: new Date(),
  });
  res.status(201).send();
});

// ? DELETE POST
router.post("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id )});
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //   return client.db("vue_express").collection("posts");
  return client.db("mydb").collection("posts");
}

module.exports = router;
