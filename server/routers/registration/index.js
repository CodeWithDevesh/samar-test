const express = require("express");
const router = express.Router();
const TeamRegistration = require("../../models/registration");

router.post("/event", async (req, res) => {
  try {
    // Extract data from the request body
    const {
      eventName,
      teamName,
      teamLeaderName,
      teamLeaderPhone,
      leaderBranch,
      leaderGraduationYear,
    } = req.body;

    // Array to store validation errors
    const errors = [];

    // Validate each field
    if (!eventName) errors.push("Event Name is required.");
    if (!teamName) errors.push("Team Name is required.");
    if (!teamLeaderName) errors.push("Team Leader Name is required.");
    if (!teamLeaderPhone) {
      errors.push("Team Leader Phone is required.");
    } else if (!/^\d{10}$/.test(teamLeaderPhone)) {
      errors.push("Team Leader Phone must be a valid 10-digit number.");
    }
    if (!leaderBranch) errors.push("Leader Branch is required.");
    if (!leaderGraduationYear) {
      errors.push("Leader Graduation Year is required.");
    } else if (
      isNaN(leaderGraduationYear) ||
      leaderGraduationYear < new Date().getFullYear()
    ) {
      errors.push("Leader Graduation Year must be a valid year in the future.");
    }

    // If there are errors, return them
    if (errors.length > 0) {
      console.error("Validation errors:", errors); // Log errors for debugging
      return res.status(400).json({ error: errors });
    }

    // Create a new team registration document
    const newRegistration = new TeamRegistration({
      eventName,
      teamName,
      teamLeader: {
        name: teamLeaderName,
        phone: teamLeaderPhone,
        branch: leaderBranch,
        yearOfGraduation: leaderGraduationYear,
      },
    });

    // Save to the database
    const savedRegistration = await newRegistration.save();
    console.log("Registration saved:", savedRegistration);
    // Send a success response
    res.status(201).json({
      message: "Team registered successfull!",
      data: savedRegistration,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
