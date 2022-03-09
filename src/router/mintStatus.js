const { Router } = require("express");
const authMiddleware = require("../middleware/auth");
const router = Router();
const MintStatus = require("../models/mintStatus");

router.get("/mint-status", async (req, res) => {
  const allMintStatus = await MintStatus.find();
  return res.send(allMintStatus);
});

router.get("/mint-status/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const mintStatus = await MintStatus.findById({ _id });
    if (!mintStatus) {
      return res.status(404).send();
    }
    return res.send(mintStatus);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.post("/mint-status", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ error: "Please provide a valid name!" });
    }

    const newMintStatus = new MintStatus({ name });
    await newMintStatus.save();
    return res.status(201).send(newMintStatus);
  } catch (error) {
    return res.status(500);
  }
});

router.patch("/mint-status/:id", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ error: "Please provide a valid name!" });
    }

    const _id = req.params.id;
    const mintStatus = await MintStatus.findById({ _id });
    if (!mintStatus) {
      return res.status(404);
    }

    mintStatus.name = name;
    await mintStatus.save();
    return res.send(mintStatus);
  } catch (error) {
    return res.status(500);
  }
});

router.delete("/mint-status/:id", authMiddleware, async (req, res) => {
  try {
    const _id = req.params.id;
    const mintStatus = await MintStatus.findById({ _id });

    if (!mintStatus) {
      return res.status(404);
    }

    await mintStatus.delete();
    return res.status(201).send(mintStatus);
  } catch (error) {
    return res.status(500);
  }
});

module.exports = router;
