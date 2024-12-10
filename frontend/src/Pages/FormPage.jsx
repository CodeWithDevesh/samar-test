import React, { useState } from "react";
const FormPage = ({
  step,
  question,
  options,
  selectedOption,
  onSelectOption,
  onNext,
  onPrevious,
  textInput,
  setTextInput,
  selectedOptions,
  onSubmit,
}) => {
  const [slide, setSlide] = useState(false);
  const [direction, setDirection] = useState("");

  const handleNext = () => {
    setDirection("next");
    setSlide(true);
    setTimeout(() => {
      setSlide(false);
      onNext();
    }, 300);
  };

  const handlePrevious = () => {
    setDirection("prev");
    setSlide(true);
    setTimeout(() => {
      setSlide(false);
      onPrevious();
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70%] md:h-screen w-[70%] bg-gray-800 overflow-hidden rounded-md ">
      <div
        className={`bg-white shadow-md rounded-lg p-6 w-[80%] transition-transform duration-300 ${
          slide
            ? direction === "next"
              ? "transform translate-x-full"
              : "transform -translate-x-full"
            : "transform translate-x-0"
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Step {step}: {question}
        </h2>
        {/* Rendering logic for Step 5 */}
        {step === 5 && selectedOptions[4] === "Shot-Put" ? (
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={textInput.name || ""}
              onChange={(e) =>
                setTextInput((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Year"
              value={textInput.year || ""}
              onChange={(e) =>
                setTextInput((prev) => ({ ...prev, year: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Email"
              value={textInput.email || ""}
              onChange={(e) =>
                setTextInput((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Phone No"
              value={textInput.phone || ""}
              onChange={(e) =>
                setTextInput((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        ) : step === 5 ? (
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Team Leader Name"
              value={textInput.teamLeaderName || ""}
              onChange={(e) =>
                setTextInput((prev) => ({
                  ...prev,
                  teamLeaderName: e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Team Leader College"
              value={textInput.teamLeaderCollege || ""}
              onChange={(e) =>
                setTextInput((prev) => ({
                  ...prev,
                  teamLeaderCollege: e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Year"
              value={textInput.year || ""}
              onChange={(e) =>
                setTextInput((prev) => ({ ...prev, year: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Email"
              value={textInput.email || ""}
              onChange={(e) =>
                setTextInput((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Team Members Name and Year"
              value={textInput.teamMembers || ""}
              onChange={(e) =>
                setTextInput((prev) => ({
                  ...prev,
                  teamMembers: e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        ) : step === 2 && selectedOptions[1] == "B. Other" ? (
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <div className="flex flex-col space-y-3">
            {options.map((option) => (
              <button
                key={option}
                className={`py-2 px-4 rounded-lg border ${
                  selectedOption === option
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
                onClick={() => onSelectOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={handlePrevious}
            disabled={step === 1}
          >
            Previous
          </button>
          {step === 5 ? (
            <button
              className={`px-4 py-2 ${
                selectedOption || textInput
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              } rounded-lg`}
              onClick={onSubmit} // Call onSubmit on click
              disabled={!selectedOption && !textInput}
            >
              Submit
            </button>  
          ) : (
            <button
              className={`px-4 py-2 ${
                selectedOption || textInput
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              } rounded-lg`}
              onClick={handleNext}
              disabled={!selectedOption && !textInput}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
