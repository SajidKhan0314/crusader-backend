const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
  image1: {
    type: Buffer,
  },
  image2: {
    type: Buffer,
  },
  image3: {
    type: Buffer,
  },
  image4: {
    type: Buffer,
  },
  code: {
    type: String,
  },
});

const About = mongoose.model("About", aboutSchema);

module.exports = About;
