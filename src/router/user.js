const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");
const router = Router();

const allowedProperties = ["name", "email", "password"];

router.post("/users", authMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const token = await newUser.generateAuthToken();
    await newUser.save();

    return res.status(201).send({ token });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.patch("/users/password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).send({ error: "Please provide valid data!" });
  }

  const isMatch = await bcrypt.compare(oldPassword, req.user.password);

  if (!isMatch) {
    return res.status(400).send({ error: "Old password is incorrect!" });
  }

  req.user.password = newPassword;
  await req.user.save();

  return res.send({ success: true });
});

router.post(
  "/users/login",
  async (req, res) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();

      return res.status(200).send({ token });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  (error, req, res, next) => {
    return res.status(400).send({ error: error.message });
  }
);

router.post(
  "/users/logout",
  authMiddleware,
  async (req, res) => {
    try {
      const removingToken = req.header("Authorization").replace("Bearer ", "");
      const removingTokenIndex = req.user.tokens.findIndex(
        (token) => token === removingToken
      );

      req.user.tokens.splice(removingTokenIndex, 1);
      await req.user.save();

      return res.status(201).send({ success: true });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  (error, req, res, next) => {
    return res.status(400).send({ error: error.message });
  }
);

router.post(
  "/users/logout-all",
  authMiddleware,
  async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();

      return res.send({ success: true });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  (error, req, res, next) => {
    return res.status(400).send({ error: error.message });
  }
);

module.exports = router;
