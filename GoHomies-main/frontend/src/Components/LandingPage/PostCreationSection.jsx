import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useScreenResizeValue } from "../../ScreenSizeFunction";
import "./PostCreationSection.css";
import { isNumeric } from "../../../util/helper";
import { CreatePost, FetchPost } from "../../../ApiCall";
import { useDispatch } from "react-redux";
import { setAllPosts } from "../../Store/AllPostsSlice";

const PostCreationSection = () => {
  const breakpoint = useScreenResizeValue();
  const dispatch = useDispatch();

  // Form states
  const [destination, setDestination] = useState("");
  const [totalPersons, setTotalPersons] = useState("");
  const [TravelMonth, setTravelMonth] = useState("");
  const [BudgetPerPerson, setBudgetPerPerson] = useState("");
  const [description, setDescription] = useState("");

  // Validations
  const [isFormValid, setIsFormValid] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // Validation check on field changes
  useEffect(() => {
    setIsFormValid(
      destination.trim() &&
        totalPersons.trim() &&
        TravelMonth.trim() &&
        BudgetPerPerson.trim() &&
        description.trim()
    );
  }, [destination, totalPersons, TravelMonth, BudgetPerPerson, description]);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "destination") setDestination(value);

    else if (name === "totalPersons") {
      if (value === "" || isNumeric(value)) {
        if (Number(value) <= 12) setTotalPersons(value);
      }
    }

    else if (name === "TravelMonth") setTravelMonth(value);

    else if (name === "BudgetPerPerson") {
      if (value === "" || isNumeric(value)) setBudgetPerPerson(value);
    }

    else if (name === "description") setDescription(value);
  };

  // Submit Handler
  const handleSubmit = async () => {
    try {
      const response = await CreatePost(
        destination,
        totalPersons,
        TravelMonth,
        BudgetPerPerson,
        description
      );

      if (response.data.msg === "Post Created Successfully") {
        window.dispatchEvent(new Event("postCreated"));
        setOpenAlert(true);

        const fetchData = async () => {
          const res = await FetchPost();
          if (res.status === 200) {
            dispatch(setAllPosts(res.data));
          }
        };
        fetchData();
      }

      // Clear form
      setDestination("");
      setTotalPersons("");
      setTravelMonth("");
      setBudgetPerPerson("");
      setDescription("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex items-center justify-center overflow-hidden w-full min-h-[100vh] py-8">
      <div
        className={`${
          breakpoint <= 1440 ? "w-[84%]" : "w-[1200px]"
        } flex flex-col lg:flex-row items-center justify-center gap-[2rem] py-[1rem]`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-[1rem] w-full">
          {/* Left text section */}
          <div className="flex-[1.5] text-black flex flex-col items-center lg:items-start gap-[1rem] p-[20px] lg:p-[40px] lg:pl-0">
            <span className="px-[2rem] py-[.25rem] rounded-full bg-[#6B8E23] text-white text-sm">
              Find Your Homie
            </span>

            <h1 className="main-title text-[2rem] md:text-[3rem] text-black capitalize font-semibold text-center lg:text-left">
              Unleash the traveler{" "}
              <span className="text-[#6B8E23]">inside you</span>, Enjoy your
              Dream Vacation
            </h1>

            <p className="text-black text-center lg:text-left text-sm md:text-base">
              Create a post and tell your mates where you're going and see who
              joins you.
            </p>
          </div>

          {/* Right form section */}
          <div className="right-section p-[1.2rem] md:p-[1.7rem] flex-[.75] w-full lg:w-auto flex flex-col items-start gap-[1rem] rounded-[1rem] bg-white/30 backdrop-sepia-0">
            <h1 className="form-title text-black">Create New Post</h1>

            <form className="form w-full">
              <div className="input-group">
                <label>Destination</label>
                <div className="input-wrapper">
                  <input
                    name="destination"
                    type="text"
                    placeholder="Tell your mates where you're going"
                    value={destination}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-[1rem]">
                <div className="input-group">
                  <label>Total Persons</label>
                  <div className="input-wrapper">
                    <input
                      name="totalPersons"
                      type="text"
                      placeholder="Max Person allowed - 12"
                      value={totalPersons}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Month of Travelling</label>
                  <div className="input-wrapper">
                    <input
                      name="TravelMonth"
                      type="text"
                      placeholder="e.g. April"
                      value={TravelMonth}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Per Person Budget</label>
                <div className="input-wrapper">
                  <input
                    name="BudgetPerPerson"
                    type="text"
                    placeholder="e.g. 10,000"
                    value={BudgetPerPerson}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Description of the Trip</label>
                <div className="input-wrapper">
                  <textarea
                    name="description"
                    placeholder="How will you do the trip and what are the expectations"
                    rows={2}
                    value={description}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>
            </form>

            <button
              onClick={handleSubmit}
              className="submit-button w-full"
              disabled={!isFormValid}
              style={{
                backgroundColor: isFormValid ? "#6B8E23" : "#ccc",
                cursor: isFormValid ? "pointer" : "not-allowed",
                color: "white",
              }}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Post Created Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PostCreationSection;
