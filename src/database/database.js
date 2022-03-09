const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.DBURL}`)
  .then(() => console.log("Database connected!"));
