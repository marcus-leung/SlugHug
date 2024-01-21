const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the users.
recordRoutes.route("/users").get(async function (req, response) {
  let db_connect = dbo.getDb();

  db_connect
    .collection("users")
    .find({})
    .toArray()
    .then((data) => {
      console.log(data);
      response.json(data);
    });

});

/*
DEPRECATED

// GET route to find user by userName
recordRoutes.route('/users/find-by-name').get(function (req, res) {
    let db_connect = dbo.getDb();
    let userNameQuery = req.query.userName; //

    db_connect.collection("users").findOne({ userName: userNameQuery }, function (err, result) {
        if (err) {
            res.status(500).send('Error occurred while trying to retrieve user');
        } else {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).send('User not found');
            }
        }
    });
});
*/

// This section will help you get a user by name
recordRoutes.route("/users/find-by-name/:name").get(async function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { userName: new ObjectId(req.params.id) };

  db_connect
    .collection("users")
    .find(myquery)
    .toArray()
    .then((data) => {
      if(data.length == 0) {
        response.status(404).send('User not found');
      } else {
        response.status(200).json(result);
      }
    });

});
 
// This section will help you create a new user.
recordRoutes.route("/users/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    userName: new ObjectId(req.body.userName),
    userType: req.body.userType
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

// This section will help you get a user by ID.
recordRoutes.route("/users/get/:id").get(async function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };

  db_connect
    .collection("users")
    .find(myquery)
    .toArray()
    .then((data) => {
      console.log(data);
      response.json(data);
    });

});

// This section will help you get a userID by their name
recordRoutes.route("/users/getID/:name").get(async function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { userName: new ObjectId(req.params.id) };

  db_connect
    .collection("users")
    .find(myquery)
    .toArray()
    .then((data) => {
      console.log(data);
      response.json(data);
    });

});
 
// This section will help you update a user by id.
recordRoutes.route("/users/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     userName: req.body.userName,
     userType: req.body.userType
   },
 };
 db_connect
   .collection("users")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a user
recordRoutes.route("users/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("users").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
// Get access to our routing object
module.exports = recordRoutes;