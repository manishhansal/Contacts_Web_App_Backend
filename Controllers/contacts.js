const messageModel = require("../Models/messages");
const contactsModel = require("../Models/contacts");
const Vonage = require("@vonage/server-sdk");
require("dotenv").config();

async function getAllContacts(req, res, next) {
  const contacts = await contactsModel.find({});
  try {
    res.json({ status: 200, contacts });
  } catch (error) {
    res.json({ status: 401, error });
  }
}

async function createContacts(req, res, next) {
  let contacts = req.body;
  const isAlready = await contactsModel.findOne({ phone: `91${contacts.phone}` });
  console.log(isAlready);
  if (isAlready === null) {
    try {
      contacts.phone = `91${contacts.phone}`
      const response = await contactsModel.insertMany([contacts]);
      res.json({ status: 200, response });
    } catch (error) {
      res.json({ status: 401, error });
    }
  }
  else {
    res.json({status:409, message:"Already Exist"})
  }
  
}

async function getAllMessages(req, res, next) {
  const contacts = await messageModel.find({});
  try {
    res.json({ status: 200, contacts });
  } catch (error) {
    res.json({ status: 401, error });
  }
}

async function createMessages(req, res, next) {
  try {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let d = `${day}/${month}/${year}`;
    let t = `${hours}:${minutes}:${seconds}`;
    let message = req.body;
    message.date = d;
    message.time = t;
    // console.log(message)
    const response = await messageModel.insertMany([message]);
    // console.log(response)
    res.json({ status: 200, response });
  } catch (error) {
    res.json({ status: 401, error });
  }
}

async function sendMessage(req, res, next) {
  const vonage = new Vonage({
    apiKey: "c1dd1b7d",
    apiSecret: "Zqwg29k10usy6LrA",
  });

  // console.log(req.body.phone)
  const from = "Manish Kumar";
  const to = `${req.body.phone}`;
  const text = `${req.body.message}`;

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        res.json({ status: 200, message: "Message sent successfully." });
        console.log("Message sent successfully.");
      } else {
        console.log(
          res.send(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          )`Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
}

async function home(req, res, next) {
  res.send("Welcome to home route.");
}

module.exports = {
  getAllContacts,
  createContacts,
  getAllMessages,
  createMessages,
  sendMessage,
  home,
};
