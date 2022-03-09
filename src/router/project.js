const { Router } = require("express");
const router = Router();
const multer = require("multer");
const sharp = require("sharp");
const authMiddleware = require("../middleware/auth");
const Project = require("../models/project");

const allowedProperties = [
  "name",
  "description",
  "mintStatus",
  "partner",
  "projectType",
  "status",
  "mintQuantity",
  "quantityDetails",
  "whitelistMethods",
  "whitelistMintPrice",
  "publicMintPrice",
  "ebPrice",
  "whitelistMintDate",
  "whitelistMintTimeUTC",
  "whitelistDetails",
  "publicMintDate",
  "mintCloseDate",
  "rarity",
  "utility",
  "utilityDetails",
  "tokenomics",
  "token",
  "staking",
  "stakingDetails",
  "tokenContract",
  "dao",
  "daoDetails",
  "twitterFollowers",
  "discordMembers",
  "contractAddress",
  "discordLink",
  "websiteLink",
  "whitePaperLink",
  "twitterLink",
  "tiktokLink",
  "instagramLink",
  "ebLink",
  "agoraLink",
  "nftContract",
];

const uploader = multer({
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Please upload a valid file!"));
    }
    callback(undefined, true);
  },
});

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().populate([
      "projectType",
      "status",
      "mintStatus",
    ]);
    return res.send(projects);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const project = await Project.findById(_id);
    if (!project) {
      return res.status(404).send();
    }
    await project.populate(["projectType", "status", "mintStatus"]);
    return res.send(project);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/projects/:id/image", async (req, res) => {
  try {
    const _id = req.params.id;
    const project = await Project.findById(_id);
    if (!project || !project.image) {
      return res.status(404).send();
    }
    res.set("Content-Type", "image/png");
    return res.send(project.image);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(
  "/projects",
  authMiddleware,
  uploader.single("image"),
  async (req, res) => {
    try {
      const projectProperties = {};
      for (let property of allowedProperties) {
        if (!req.body[property]) {
          projectProperties[property] = undefined;
        } else {
          projectProperties[property] = req.body[property];
        }
      }
      const newProject = new Project(projectProperties);
      if (req.file && req.file.buffer) {
        const buffer = await sharp(req.file.buffer)
          .resize({ width: 348, height: 320 })
          .png()
          .toBuffer();
        newProject.image = buffer;
      }
      await newProject.save();
      return res.status(201).send(newProject);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  (error, req, res, next) => {
    return res.status(500).send({ error: error.message });
  }
);

router.patch(
  "/projects/:id",
  authMiddleware,
  uploader.single("image"),
  async (req, res) => {
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update) =>
      allowedProperties.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid operations!" });
    }

    try {
      const _id = req.params.id;
      const project = await Project.findById(_id);

      if (!project) {
        return res.status(404).send();
      }

      for (let update of updates) {
        if (!req.body[update]) {
          project[update] = undefined;
        } else {
          project[update] = req.body[update];
        }
      }

      if (req.file && req.file.buffer) {
        const buffer = await sharp(req.file.buffer)
          .resize({ width: 348, height: 320 })
          .png()
          .toBuffer();
        project.image = buffer;
      }

      await project.save();

      return res.send(project);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  (error, req, res, next) => {
    return res.status(500).send({ error: error.message });
  }
);

router.delete("/projects/:id", authMiddleware, async (req, res) => {
  try {
    const _id = req.params.id;
    const project = await Project.findById(_id);
    if (!project) {
      return res.status(404).send();
    }
    await project.delete();
    return res.send(project);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
