import React, { useEffect } from "react";

const MemberForm = ({ value, setValue, index }) => {
  useEffect(() => {
    if (value.length <= index) {
      setValue((prev) => {
        const updatedArray = [...prev];
        while (updatedArray.length <= index) {
          updatedArray.push({ name: "", year: null });
        }
        return updatedArray;
      });
    }
  }, [value, index, setValue]);

  const handleInputChange = (field, fieldValue) => {
    setValue((prev) => {
      const updatedArray = [...prev];
      while (updatedArray.length <= index) {
        updatedArray.push({ name: "", year: null });
      }
      updatedArray[index] = { ...updatedArray[index], [field]: fieldValue };
      return updatedArray;
    });
  };

  return (
    <div>
      <h3>{`Team Member ${index + 2}`}</h3>
      <div className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Name"
          value={value[index]?.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Year"
          value={value[index]?.year || ""}
          onChange={(e) => handleInputChange("year", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default MemberForm;
