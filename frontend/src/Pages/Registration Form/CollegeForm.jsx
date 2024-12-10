import React, { useEffect, useState } from "react";

const CollegeForm = ({ value, setValue }) => {
  const [selectedOpt, setSelectedOpt] = useState();

  useEffect(() => {
    if (value == "NIT Raipur") setSelectedOpt(0);
    else if (value != "") setSelectedOpt(1);
  }, []);

  const handleOptionChange = (e) => {
    const selectedCollege = e.target.value;
    if (e.target.value == "Other") {
      setSelectedOpt(1);
      setValue("");
    } else {
      setValue(selectedCollege);
      setSelectedOpt(0);
    }
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <h3>Select Your College</h3>
      <div className="flex flex-col gap-2">
        <label className="block mb-2 text-sm font-medium">
          <input
            type="radio"
            name="college"
            value="NIT Raipur"
            checked={selectedOpt == 0}
            onChange={handleOptionChange}
          />
          NIT Raipur
        </label>
        <label className="block mb-2 text-sm font-medium">
          <input
            type="radio"
            name="college"
            value="Other"
            className="mg"
            checked={selectedOpt == 1}
            onChange={handleOptionChange}
          />
          Other
        </label>
      </div>
      {selectedOpt == 1 && (
        <div>
          <label className="block mb-2 text-sm font-medium">
            Enter College Name:
            <input
              type="text"
              value={value}
              onChange={handleInputChange}
              placeholder="Enter your college"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default CollegeForm;
