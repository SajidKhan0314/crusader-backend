const mongoose = require("mongoose");

const coderSchema = mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const Coder = mongoose.model("Coder", coderSchema);

module.exports = Coder;
