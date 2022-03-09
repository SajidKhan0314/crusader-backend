const { Router } = require("express");
const authMiddleware = require("../middleware/auth");
const router = Router();
const Coder = require("../models/coder");

router.get("/codes", async (req, res) => {
  const codes = await Coder.find();
  return res.send(codes);
});

router.post("/codes", authMiddleware, async (req, res) => {
  try {
    const code = await Coder.findOne({ location: req.body.location });
    if (code) {
      code.code = req.body.code;
      await code.save();
      return res.send(code);
    }

    const newCode = new Coder({
      location: req.body.location,
      code: req.body.code,
    });
    await newCode.save();
    return res.status(201).send(newCode);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = router;
