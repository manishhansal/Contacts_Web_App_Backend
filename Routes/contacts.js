const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const contactsController = require("../Controllers/contacts");

app.get("/", contactsController.home);

app.get("/contacts", contactsController.getAllContacts);
app.post("/contacts", contactsController.createContacts);

app.get("/messages", contactsController.getAllMessages);
app.post("/messages", contactsController.createMessages);

app.post("/sendMessage", contactsController.sendMessage);

module.exports = app;
