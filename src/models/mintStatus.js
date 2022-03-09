const { default: mongoose } = require("mongoose");

const projectMintStatus = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const MintStatus = mongoose.model("MintStatus", projectMintStatus);

module.exports = MintStatus;
