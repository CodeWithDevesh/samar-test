const express = require("express");
const TeamRegistration = require("../../models/registration");
const router = express.Router();

router.get("/:eventName", async (req, res) => {
  try {
    const { eventName } = req.params;

    const registrations = await TeamRegistration.find({ eventName });

    if (registrations.length === 0) {
      return res
        .status(404)
        .json({ message: `No registrations found for event: ${eventName}` });
    }

    res.status(200).json({
      message: `Registrations for event: ${eventName}`,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
