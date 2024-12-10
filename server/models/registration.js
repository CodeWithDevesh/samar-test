const mongoose = require("mongoose");

const teamRegistrationSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
      default: "Male",
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    teamLeader: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: Number,
        required: true,
        match: /^\d{10}$/,
        minlength: 10,
        maxlength: 10,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      yearOfGraduation: {
        type: Number,
        required: true,
        min: new Date().getFullYear(),
      },
    },
    teamMembers: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          yearOfGraduation: {
            type: Number,
            required: true,
            min: new Date().getFullYear(),
          },
        },
      ],
      validate: [
        {
          validator: (v) => v.length <= 15,
          message: "A team can have at most 15 members.",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Add an index for faster querying
teamRegistrationSchema.index(
  { sport: 1, category: 1, teamName: 1 },
  { unique: true }
);

module.exports = mongoose.model("TeamRegistration", teamRegistrationSchema);
