import React from "react";

const TeamLeaderForm = ({leaderDetails, setLeaderDetails}) => {
  return (
    <div>
      <h3>Team Leader</h3>
      <div className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Team Leader Name"
          value={leaderDetails.name || ""}
          onChange={(e) =>
            setLeaderDetails((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Year"
          value={leaderDetails.year || ""}
          onChange={(e) =>
            setLeaderDetails((prev) => ({ ...prev, year: e.target.value }))
          }
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Whatsapp No."
          value={leaderDetails.phone || ""}
          onChange={(e) =>
            setLeaderDetails((prev) => ({ ...prev, phone: e.target.value }))
          }
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={leaderDetails.email || ""}
          onChange={(e) =>
            setLeaderDetails((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default TeamLeaderForm;
