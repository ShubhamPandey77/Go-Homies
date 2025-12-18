import React, { useState } from "react";
import { useScreenResizeValue } from "../../ScreenSizeFunction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setUserData } from "../../Store/UserDataSlice";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const breakpoint = useScreenResizeValue();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    Logout();
    navigate("/signin");
  };

  const navLinks = [
    { name: "Explore", path: "/" },
    { name: "Posts", path: "/posts" },
    { name: "Vlogs", path: "/vlogs" },
    { name: "Booking", path: "/booking" },
    { name: "About Us", path: "/about_us" },
    { name: "Contact Us", path: "/contact_us" },
  ];

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="flex items-center justify-center w-full py-4 md:py-5 px-4">
        <div
          className={`${
            breakpoint <= 1440 ? "w-full max-w-[95%]" : "max-w-[1200px] w-full"
          } flex items-center justify-between bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-xl rounded-2xl px-6 md:px-8 py-3 md:py-4 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          {/* Logo Section */}
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#6B8E23] to-[#5a7a1c] rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#6B8E23]/50 transition-all duration-300">
              <span className="text-white font-bold text-lg">GH</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline group-hover:text-[#6B8E23] transition-colors">GoHomies</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 group relative"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6B8E23] to-[#f555a7] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-4">
            {!userData.isAuthenticated && (
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition-colors duration-300"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/signin")}
                  className="px-5 py-2 bg-gradient-to-r from-[#6B8E23] to-[#5a7a1c] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#6B8E23]/50 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  Log In
                </button>
              </div>
            )}

            {userData.isAuthenticated && (
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={() => navigate("/userprofile")}
                  className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  {userData?.name?.split(" ")[0] || "User"}
                </button>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 right-0 mx-4 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col divide-y divide-white/10">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className="px-6 py-3 text-left text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
              >
                {link.name}
              </button>
            ))}
            <div className="flex flex-col gap-2 p-4">
              {!userData.isAuthenticated && (
                <>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-gray-200 hover:text-white border border-gray-400 rounded-lg transition-colors"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signin");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#6B8E23] to-[#5a7a1c] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Log In
                  </button>
                </>
              )}
              {userData.isAuthenticated && (
                <>
                  <button
                    onClick={() => {
                      navigate("/userprofile");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-gray-200 border border-gray-400 rounded-lg transition-colors"
                  >
                    {userData?.name?.split(" ")[0] || "User"}
                  </button>
                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-sm mx-4 border border-gray-700 shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-2">Confirm Logout</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to log out?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all font-medium"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
