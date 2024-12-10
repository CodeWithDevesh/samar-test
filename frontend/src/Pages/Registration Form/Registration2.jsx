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
  const [teamMembers, setTeamMembers] = useState([]);

  const [leaderDetails, setLeaderDetails] = useState({});

  const [enNext, setEnNext] = useState(false);

  const [step, setStep] = useState(0);
  const minStep = 4;
  const [lastStep, setLastStep] = useState(minStep);

  const groups = ["IT + Mech", "CSE + META"];
  const sports = [
    "Cricket",
    "Football",
    "Badminton (Singles)",
    "Badminton (Doubles)",
  ];
  const [players, setPlayers] = useState(0);

  useEffect(() => {
    // Load list of sports from the server
  }, []);

  useEffect(() => {
    // Get no of players for the particular sport from the server
    if (sport) {
      setPlayers(5 - 1);
    }
  }, [sport]);
  useEffect(() => {
    setLastStep(minStep + players);
  }, [players]);

  useEffect(() => {
    switch (step) {
      case 0:
        if (sport == "") {
          setEnNext(false);
          return;
        }
        break;
      case 1:
        if (college == "") {
          setEnNext(false);
          return;
        }
        break;
      case 2:
        if (category == "") {
          setEnNext(false);
          return;
        }
        break;
      case 3:
        if (teamName == "") {
          setEnNext(false);
          return;
        }
        break;
      case 4:
        if(!leaderDetails.name || !leaderDetails.email || !leaderDetails.phone || !leaderDetails.year){
          setEnNext(false);
          return;
        }
    }
    if(step > minStep){
      if(teamMembers.length <= step - 1 - minStep){
        setEnNext(false);
        return;
      }
      if(!teamMembers[step - 1 - minStep].name || !teamMembers[step - 1 - minStep].year){
        setEnNext(false);
        return;
      }
    }
    setEnNext(true);
  }, [college, category, teamName, sport, leaderDetails, teamMembers, step]);

  const handlePrev = () => {
    setStep((s) => s - 1);
  };
  const handleNext = () => {
    setStep((s) => s + 1);
  };
  const handleSubmit = () => {
    // submit the form to the server
  }

  return (
    <div className="h-screen w-screen flex justify-evenly items-center">
      <div>
        {step == 0 ? (
          <OptionForm
            ques={"Select Sport"}
            value={sport}
            setValue={setSport}
            options={sports}
          />
        ) : (
          <>
            {step == 1 && <CollegeForm value={college} setValue={setCollege} />}
            {step == 2 && (
              <OptionForm
                ques={"Select Category"}
                value={category}
                setValue={setCategory}
                options={["Male", "Female"]}
              />
            )}
            {step == 3 && college != "NIT Raipur" && (
              <InputForm
                value={teamName}
                setValue={setTeamName}
                ques={"Team Name?"}
              />
            )}
            {step == 3 && college == "NIT Raipur" && (
              <OptionForm
                ques={"Select Group"}
                value={teamName}
                setValue={setTeamName}
                options={groups}
              />
            )}
            {step == 4 && (
              <TeamLeaderForm
                leaderDetails={leaderDetails}
                setLeaderDetails={setLeaderDetails}
              />
            )}
            {Array.from({ length: players }).map((_, index) =>
              step === index + 5 ? (
                <MemberForm
                  key={index}
                  index={index}
                  value={teamMembers}
                  setValue={setTeamMembers}
                />
              ) : null
            )}
          </>
        )}

        <div className="flex gap-3 mt-2">
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            disabled={step == 0}
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
      {step != 0 && <Rules sport={sport} />}
    </div>
  );
};

export default Registration2;
