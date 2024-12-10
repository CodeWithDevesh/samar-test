const express = require("express");
const registrationRouter = require("./registration");
const loginRouter = require("./login");
const adminAuth = require("../../middlewares/admin-auth");
const router = express.Router();
const Admin = require("../../models/admin");

router.use("/login", loginRouter);


// Temporary Route... comment out in production
router.post("/create-admin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Admin with this username already exists." });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin account created successfully." });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


router.use(adminAuth);

router.get("/test", (req, res) => {
  res.status(200).send("Admin Routes Connected!!");
});

router.use("/registrations", registrationRouter);

module.exports = router;
