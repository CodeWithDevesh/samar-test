import React, { useEffect } from "react";

const MemberForm = ({ value, setValue, count }) => {
  useEffect(() => {
    if (value.length < count) {
      setValue((prev) => {
        const updatedArray = [...prev];
        while (updatedArray.length < count) {
          updatedArray.push({ name: "", year: null });
        }
        return updatedArray;
      });
    }
  }, [value, count, setValue]);

  const handleInputChange = (index, field, fieldValue) => {
    setValue((prev) => {
      const updatedArray = [...prev];
      updatedArray[index] = { ...updatedArray[index], [field]: fieldValue };
      return updatedArray;
    });
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          <h3>{`Team Member ${index + 2}`}</h3>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={value[index]?.name || ""}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Year"
              value={value[index]?.year || ""}
              onChange={(e) => handleInputChange(index, "year", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default MemberForm;
