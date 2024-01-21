const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const inboxRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the inboxes.
inboxRoutes.route("/inbox").get(async function (req, response) {
  let db_connect = dbo.getDb();

  db_connect
    .collection("inbox")
    .find({})
    .toArray()
    .then((data) => {
      console.log(data);
      response.json(data);
    });

});

// This section will help you create a new response.
inboxRoutes.route("/inbox/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      messageReceiver: req.body.messageReceiver, 
      messageHead: req.body.messageHead, 
      messageContent: req.body.messageContent, 
      messageType: req.body.messageType, 
      messageVisibility: req.body.messageVisibility
    };
    db_connect.collection("inbox").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });

// This section will help you get a single inbox by the message receiver parameter
inboxRoutes.route("/inbox/get/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { messageReceiver: new ObjectId(req.params.id) };
  console.log(req.params.id)
  db_connect
    .collection("inbox")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });   

// This section will help you delete an inbox given the id
inboxRoutes.route("inbox/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("inbox").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
 });

// Get access to our routing object
module.exports = inboxRoutes;