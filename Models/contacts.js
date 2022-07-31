const mongoose = require("mongoose");

const contact = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: {type: String, required: true},
});

module.exports = mongoose.model("contact", contact);
