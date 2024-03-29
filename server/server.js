const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Request routing and handleing
app.use(require("./routes/user"));
app.use(require("./routes/message"))
app.use(require("./routes/inbox"))

// get driver connection
const dbo = require("./db/conn");

app.listen(port, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);

  /* successful CRUD database push
  let myobj = {
    name: "test_guy",
    age: 89,
    gpa: 3.2,
  };
  dbo.getDb().collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
  */
});

// Create a user
async function createUser(data) {
  try {
    const response = await fetch('http://localhost:5000/users/add', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();
    console.log("Success:", result)
  } catch (err) {
    console.error(err)
  }
}

// Create a message
async function createMessage(data) {
  try {
    const response = await fetch('http://localhost:5000/messages/add', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();
    console.log("Success:", result)
  } catch (err) {
    console.error(err)
  }
}

// Create a response to a given userID, it's in the data object
async function createResponse(data) {
  try {
    const response = await fetch('http://localhost:5000/inbox/add', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();
    console.log("Success:", result)
  } catch (err) {
    console.error(err)
  }
}

// Get the messages all
async function getMessages() {
  try {
    const response = await fetch('http://localhost:5000/messages')
    const result = await response.json();

    console.log("Success:", result)
  } catch (err) {
    console.error(err)
  }
}

// Get an inbox by inbox receiver
async function getInbox(id) {
  try {
    const response = await fetch('http://localhost:5000/inbox/get/'+id)
    const result = await response.json();

    console.log("Success:", result)
  } catch (err) {
    console.error(err)
  }
}
module.exports ={
    createUser,
    createMessage,
    createResponse,
    getMessages
}

// Delete the message by message id
async function deleteMessage(id) {
  try {
    const response = await fetch('http://localhost:5000/messages/delete/'+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const result = await response.json();

    console.log("Success:", result)
  } catch (err) {
    console.error(err)
  }
}

// Delete an inbox by inbox id
async function deleteInbox(id) {
  try {
    const response = await fetch('http://localhost:5000/inbox/delete/'+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const result = await response.json();

    console.log("Success:", result)
  } catch (err) {
    console.error(err)
  }
}

// Delete a user by table id
async function deleteUser(id) {
  try {
    const response = await fetch('http://localhost:5000/user/delete/'+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const result = await response.json();

    console.log("Success:", result)
  } catch (err) {
    console.error(err)
  }
}