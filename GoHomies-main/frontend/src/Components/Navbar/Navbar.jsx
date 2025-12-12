import React from "react";
import { useScreenResizeValue } from "../../ScreenSizeFunction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setUserData } from "../../Store/UserDataSlice";

const Navbar = () => {
  const breakpoint = useScreenResizeValue();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.UserData);

  const Logout = () => {
    Cookies.remove("uid");

    dispatch(
      setUserData({
        name: "",
        email: "",
        username: "",
        designation: "",
        about: "",
        title: "",
        isAuthenticated: false,
      })
    );
  };

  return (
    <div className="flex items-center justify-center w-full z-50 transition-all duration-500 fixed top-[100px]">
      <div
        className={`${
          breakpoint <= 1440 ? "w-[84%]" : "w-[1200px]"
        } flex flex-col items-center justify-center overflow-hidden bg-[rgba(255,255,255,0)] backdrop-blur-[24px] rounded-[12px] px-[1rem]`}
      >
        <div className="w-full py-[1rem] flex items-center justify-between gap-[1rem]">
          {/* Left Section */}
          <div className="flex flex-row gap-[16px] items-center">
            {/* LOGO */}
            <div onClick={() => navigate("/")} className="cursor-pointer">
              {/* Your SVG remains unchanged */}
            </div>

            {/* Menu */}
            <div className="flex gap-[8px]">
              <button
                onClick={() => navigate("/")}
                className="px-[16px] text-[#d7d7d8] hover:text-[#7B7194] text-[14px] font-semibold"
              >
                Explore
              </button>
              <button
                onClick={() => navigate("/posts")}
                className="px-[16px] text-[#d7d7d8] hover:text-[#7B7194] text-[14px] font-semibold"
              >
                Posts
              </button>
              <button
                onClick={() => navigate("/vlogs")}
                className="px-[16px] text-[#d7d7d8] hover:text-[#7B7194] text-[14px] font-semibold"
              >
                Vlogs
              </button>
              <button
                onClick={() => navigate("/booking")}
                className="px-[16px] text-[#d7d7d8] hover:text-[#7B7194] text-[14px] font-semibold"
              >
                Booking
              </button>
              <button
                onClick={() => navigate("/about_us")}
                className="px-[16px] text-[#d7d7d8] hover:text-[#7B7194] text-[14px] font-semibold"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/contact_us")}
                className="px-[16px] text-[#d7d7d8] hover:text-[#7B7194] text-[14px] font-semibold"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Auth Section */}
          <div>
            {!userData.isAuthenticated && (
              <div className="flex flex-row items-center justify-center gap-[12px] max-w-[200px]">
                <div
                  onClick={() => navigate("/signup")}
                  className="cursor-pointer text-[#d7d7d8] hover:text-[#7B7194]"
                >
                  Sign Up
                </div>
                <div
                  onClick={() => navigate("/signin")}
                  className="cursor-pointer bg-[#6B8E23] px-[24px] py-[.5rem] rounded-full text-white hover:bg-[#5a7a1c]"
                >
                  Log In
                </div>
              </div>
            )}

            {userData.isAuthenticated && (
              <div className="flex items-center justify-center gap-[12px]">
                <div
                  onClick={() => navigate("/userprofile")}
                  className="font-medium text-[1rem] text-white cursor-pointer hover:text-[#7B7194]"
                >
                  {userData?.name?.split(" ")[0] || "User"}
                </div>

                <div
                  onClick={() => {
                    Logout();
                    navigate("/signin");
                  }}
                  className="cursor-pointer bg-[#6B8E23] px-[24px] py-[.35rem] rounded-full text-white hover:bg-[#5a7a1c]"
                >
                  LogOut
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
