const { Router } = require("express");
const authMiddleware = require("../middleware/auth");
const router = Router();
const Status = require("../models/status");

router.get("/status", async (req, res) => {
  const allStatus = await Status.find();
  return res.send(allStatus);
});

router.get("/status/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const status = await Status.findById({ _id });
    if (!status) {
      return res.status(404).send();
    }
    return res.send(status);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.post("/status", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ error: "Please provide a valid name!" });
    }

    const newStatus = new Status({ name });
    await newStatus.save();
    return res.status(201).send(newStatus);
  } catch (error) {
    return res.status(500);
  }
});

router.patch("/status/:id", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ error: "Please provide a valid name!" });
    }

    const _id = req.params.id;
    const status = await Status.findById({ _id });
    if (!status) {
      return res.status(404);
    }

    status.name = name;
    await status.save();
    return res.send(status);
  } catch (error) {
    return res.status(500);
  }
});

router.delete("/status/:id", authMiddleware, async (req, res) => {
  try {
    const _id = req.params.id;
    const status = await Status.findById({ _id });

    if (!status) {
      return res.status(404);
    }

    await status.delete();
    return res.status(201).send(status);
  } catch (error) {
    return res.status(500);
  }
});

module.exports = router;
