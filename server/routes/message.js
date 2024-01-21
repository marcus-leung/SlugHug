const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const messageRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the messages.
messageRoutes.route("/messages").get(async function (req, response) {
  let db_connect = dbo.getDb();

  db_connect
    .collection("messages")
    .find({})
    .toArray()
    .then((data) => {
      console.log(data);
      response.json(data);
    });

});

// This section will help you create a new message.
messageRoutes.route("/messages/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      messageSender: req.body.messageSender, 
      messageHead: req.body.messageHead, 
      messageContent: req.body.messageContent, 
      messageType: req.body.messageType, 
      messageVisibility: req.body.messageVisibility
    };
    db_connect.collection("messages").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });
 
// Get access to our routing object
module.exports = messageRoutes;