const User = require("../models/user");

const createUser = async () => {
  try {
    const userExists = await User.findOne({ email: "admin@admin.com" });
    if (userExists) {
      throw new Error("Admin already exists!");
    }
    const admin = new User({
      name: "admin",
      email: "admin@admin.com",
      password: "hello123",
    });
    await admin.save();
    console.log("User created!");
  } catch (error) {
    console.log(error.message);
  }
};

createUser();
