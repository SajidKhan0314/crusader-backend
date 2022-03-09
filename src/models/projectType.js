const { default: mongoose } = require("mongoose");

const projectTypeSchema = mongoose.Schema(
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

const ProjectType = mongoose.model("ProjectType", projectTypeSchema);

module.exports = ProjectType;
