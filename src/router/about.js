const { Router } = require("express");
const router = Router();
const multer = require("multer");
const About = require("../models/about");

const uploader = multer({
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Please upload a valid file!"));
    }
    callback(undefined, true);
  },
});

router.get("/about/code", async (req, res) => {
  const about = await About.find();

  if (about.length > 0) {
    return res.send(about[0]);
  }
  return res.send("");
});

router.post("/about/code", async (req, res) => {
  const about = await About.find();

  if (about.length === 0) {
    const newAbout = new About({
      code: req.body.code,
    });
    await newAbout.save();
    return res.status(201).send();
  }

  about[0].code = req.body.code;
  await about[0].save();

  return res.send(about[0]);
});

module.exports = router;
