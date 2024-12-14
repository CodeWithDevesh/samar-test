import React, { useEffect, useState } from "react";
import CollegeForm from "./CollegeForm";
import OptionForm from "./OptionForm";
import InputForm from "./InputForm";
import TeamLeaderForm from "./TeamLeaderForm";
import Rules from "./Rules";
import MemberForm from "./MemberForm";

const Registration2 = () => {
  const [sport, setSport] = useState("");
  const [college, setCollege] = useState("");
  const [category, setCategory] = useState("");
  const [teamName, setTeamName] = useState("");
  const [leaderDetails, setLeaderDetails] = useState({});
  const [memberDetails, setMemberDetails] = useState([]);
  const [enNext, setEnNext] = useState(false);
  const [step, setStep] = useState(0);
  const [lastStep, setLastStep] = useState(4);
  const [players, setPlayers] = useState(0);

  const SPORTS = [
    "Cricket",
    "Football",
    "Badminton (Singles)",
    "Badminton (Doubles)",
  ];
  const PLAYERS = {
    Cricket: 11,
    Football: 15,
    "Badminton (Singles)": 1,
    "Badminton (Doubles)": 2,
  };

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbztFk4gM7hvM21S9TbZQ9BG8t0mugJPBX1vz7OOyFncrKPG0O9hpCO9SOyLzBc5B0n5aQ/exec";

  useEffect(() => {
    // Get no of players for the particular sport from the server
    if (sport) {
      setPlayers(PLAYERS[sport]);
    }
  }, [sport]);
  useEffect(() => {
    if (players > 1) setLastStep(5);
    else setLastStep(4);
  }, [players]);

  useEffect(() => {
    // Validation for enabling the "Next" button
    switch (step) {
      case 0:
        setEnNext(sport !== "");
        break;
      case 1:
        setEnNext(college !== "");
        break;
      case 2:
        setEnNext(category !== "");
        break;
      case 3:
        setEnNext(teamName !== "");
        break;
      case 4:
        setEnNext(
          leaderDetails.name &&
            leaderDetails.email &&
            leaderDetails.phone &&
            leaderDetails.year
        );
        break;
      case 5:
        if (memberDetails.length != players - 1) {
          setEnNext(false);
          return;
        }
        let cont = true;
        memberDetails.forEach((v) => {
          console.log(v);
          if (!v.name || !v.year) {
            cont = false;
          }
        });
        setEnNext(cont);
        break;
      default:
        setEnNext(false);
    }
  }, [sport, college, category, teamName, leaderDetails, memberDetails, step]);

  const handlePrev = () => {
    setStep((s) => s - 1);
  };

  const handleNext = () => {
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    const payload = {
      sport,
      college,
      category,
      teamName,
      leaderName: leaderDetails.name,
      leaderEmail: leaderDetails.email,
      leaderPhone: leaderDetails.phone,
      leaderYear: leaderDetails.year,
    };

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(payload).toString(),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        const errorText = await response.text();
        alert("Form submission failed: " + errorText);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-evenly items-center">
      <div className="overflow-y-auto h-1/2">
        {step === 0 && (
          <OptionForm
            ques={"Select Sport"}
            value={sport}
            setValue={setSport}
            options={SPORTS}
          />
        )}
        {step === 1 && <CollegeForm value={college} setValue={setCollege} />}
        {step === 2 && (
          <OptionForm
            ques={"Select Category"}
            value={category}
            setValue={setCategory}
            options={["Male", "Female"]}
          />
        )}
        {step === 3 && college !== "NIT Raipur" && (
          <InputForm
            value={teamName}
            setValue={setTeamName}
            ques={"Team Name?"}
          />
        )}
        {step === 3 && college === "NIT Raipur" && (
          <OptionForm
            ques={"Select Group"}
            value={teamName}
            setValue={setTeamName}
            options={["IT + Mech", "CSE + META"]}
          />
        )}
        {step === 4 && (
          <TeamLeaderForm
            leaderDetails={leaderDetails}
            setLeaderDetails={setLeaderDetails}
          />
        )}
        {step === 5 && (
          <MemberForm
            value={memberDetails}
            setValue={setMemberDetails}
            count={players-1}
          />
        )}

        <div className="flex gap-3 mt-2">
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            disabled={step === 0}
            onClick={handlePrev}
          >
            Prev
          </button>
          {step != lastStep && (
            <button
              disabled={!enNext}
              onClick={handleNext}
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Next
            </button>
          )}
          {step == lastStep && (
            <button
              disabled={!enNext}
              onClick={handleSubmit}
              className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {step !== 0 && <Rules sport={sport} />}
    </div>
  );
};

export default Registration2;
