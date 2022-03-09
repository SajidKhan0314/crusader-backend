const { Router } = require("express");
const authMiddleware = require("../middleware/auth");
const router = Router();
const ProjectType = require("../models/projectType");

router.get("/project-types", async (req, res) => {
  const projectTypes = await ProjectType.find();
  return res.send(projectTypes);
});

router.get("/project-types/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const projectType = await ProjectType.findById({ _id });
    if (!projectType) {
      return res.status(404).send();
    }
    return res.send(projectType);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.post("/project-types", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ error: "Please provide a valid name!" });
    }

    const newProjectType = new ProjectType({ name });
    await newProjectType.save();
    return res.status(201).send(newProjectType);
  } catch (error) {
    return res.status(500);
  }
});

router.patch("/project-types/:id", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ error: "Please provide a valid name!" });
    }

    const _id = req.params.id;

    const projectType = await ProjectType.findById({ _id });

    if (!projectType) {
      return res.status(404);
    }

    projectType.name = name;

    await projectType.save();
    return res.send(projectType);
  } catch (error) {
    return res.status(500);
  }
});

router.delete("/project-types/:id", authMiddleware, async (req, res) => {
  try {
    const _id = req.params.id;
    const projectType = await ProjectType.findById({ _id });

    if (!projectType) {
      return res.status(404);
    }

    await projectType.delete();
    return res.status(201).send(projectType);
  } catch (error) {
    return res.status(500);
  }
});

module.exports = router;
