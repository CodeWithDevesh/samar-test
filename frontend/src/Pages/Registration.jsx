import React, { useState } from "react";
import axios from "axios";
import FormPage from "./FormPage";

const App = () => {
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [textInput, setTextInput] = useState("");
  const [formSteps, setFormSteps] = useState({
    1: { question: "Which college?", options: ["A. NIT Raipur", "B. Other"] },
    2: { question: "", options: [] },
    3: { question: "Choose your gender", options: ["Male", "Female"] },
    4: { question: "Choose your sport", options: [] },
    5: { question: "Enter your details", options: [] }, // Step for singles games
    6: { question: "Enter team details", options: [] }, // Step for multiplayer games
  });

  const handleSelectOption = (option) => {
    setSelectedOptions((prev) => ({ ...prev, [step]: option }));
    if (step === 1) {
      if (option === "A. NIT Raipur") {
        setFormSteps((prev) => ({
          ...prev,
          2: {
            question: "Choose your branch",
            options: [
              "A. IT+Mech",
              "B. ECE+CSE",
              "C. XYZ+ABC",
              "D. Arch+Biotech",
            ],
          },
        }));
      } else {
        setFormSteps((prev) => ({
          ...prev,
          2: { question: "Enter your team name", options: []},
        }));
      }
    } else if (step === 3) {
      if (option === "Male") {
        setFormSteps((prev) => ({
          ...prev,
          4: {
            question: "Choose your sport",
            options: ["Cricket", "Football", "Shot-Put"],
          },
        }));
      } else if (option === "Female") {
        setFormSteps((prev) => ({
          ...prev,
          4: {
            question: "Choose your sport",
            options: ["Volleyball", "Handball", "Shot-Put"],
          },
        }));
      }
    } else if (step === 4) {
      if (["Shot-Put"].includes(option)) {
        setFormSteps((prev) => ({
          ...prev,
          5: { question: "Enter your details", options: [] },
        }));
      } else {
        setFormSteps((prev) => ({
          ...prev,
          5: { question: "Enter team details", options: [] },
        }));
      }
    }
  };

  const handleNext = () => {
    if (step < Object.keys(formSteps).length) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Options:", selectedOptions);
    // You can also send the selectedOptions to your backend here
  };

  return (
    <div className="flex flex-col md:flex-row md:h-screen bg-gray-900 text-black p-4 md:p-11">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 bg-gray-800 rounded-lg mb-4 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Register Now</h1>
        <FormPage
          step={step}
          question={formSteps[step].question}
          options={formSteps[step].options}
          selectedOption={selectedOptions[step]}
          onSelectOption={handleSelectOption}
          onNext={handleNext}
          onPrevious={handlePrevious}
          textInput={textInput}
          setTextInput={setTextInput}
          selectedOptions={selectedOptions} // Pass entire selectedOptions object
          onSubmit={handleSubmit} // Pass handleSubmit to FormPage
        />
      </div>
      {/* Rules Section */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center bg-gray-900 overflow-auto">
        <h2 className="text-lg md:text-xl font-bold text-purple-400 mb-4">
          SAMMAR
        </h2>
        <h3 className="text-md md:text-lg font-semibold mb-2">
          Rules and Regulations
        </h3>
        <ul className="list-decimal list-inside text-gray-300 space-y-2">
          <li>Team can have a maximum of four members.</li>
          <li>
            Anyone can control the robot, and players can be exchanged in the
            middle of the match.
          </li>
          <li>
            A robot can push or hit the ball. It cannot withhold or grab the
            ball.
          </li>
          <li>
            Human interference (e.g., touching the robot) during the game is
            allowed but limited to 3 free touches; penalties will follow.
          </li>
          <li>
            Judges' decisions and Event Organizers' rulings are final and
            binding.
          </li>
          <li>
            Coordinators may request explanations for robot actions and modify
            rules as needed.
          </li>
          <li>
            Rules and regulations are subject to change without prior notice.
          </li>
          <li>
            Positions of balls and obstacles will be decided on the day of the
            event.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
