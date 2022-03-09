const { default: mongoose } = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
      // required: true,
    },
    mintStatus: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "MintStatus",
    },
    partner: {
      type: String,
    },
    projectType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProjectType",
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Status",
    },
    mintQuantity: {
      type: Number,
    },
    quantityDetails: {
      type: String,
    },
    whitelistMethods: {
      type: String,
    },
    whitelistMintPrice: {
      type: Number,
    },
    whitelistDetails: {
      type: String,
    },
    publicMintPrice: {
      type: Number,
    },
    ebPrice: {
      type: Number,
    },
    whitelistMintDate: {
      type: Date,
    },
    whitelistMintTimeUTC: {
      type: Date,
    },
    publicMintDate: {
      type: Date,
    },
    mintCloseDate: {
      type: Date,
    },
    rarity: {
      type: String,
    },
    utility: {
      type: String,
    },
    utilityDetails: {
      type: String,
    },
    tokenomics: {
      type: String,
    },
    staking: {
      type: String,
    },
    stakingDetails: {
      type: String,
    },
    token: {
      type: String,
    },
    tokenContract: {
      type: String,
    },
    dao: {
      type: String,
    },
    daoDetails: {
      type: String,
    },
    twitterFollowers: {
      type: Number,
    },
    discordMembers: {
      type: Number,
    },
    contractAddress: {
      type: String,
    },
    discordLink: {
      type: String,
    },
    websiteLink: {
      type: String,
    },
    whitePaperLink: {
      type: String,
    },
    twitterLink: {
      type: String,
    },
    tiktokLink: {
      type: String,
    },
    instagramLink: {
      type: String,
    },
    ebLink: {
      type: String,
    },
    agoraLink: {
      type: String,
    },
    nftContract: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.methods.toJSON = function () {
  const project = this;
  const projectObject = project.toObject();
  delete projectObject.image;
  return projectObject;
};

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
