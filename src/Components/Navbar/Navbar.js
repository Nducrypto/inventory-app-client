import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useStateContext } from "../../States/Context/ContextProvider";
import { Button, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutPrompt from "./LogoutPrompt";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex h-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>
);
const Navbar = () => {
  const {
    setActiveMenu,
    handleClick,
    screenSize,
    setScreenSize,
    search,
    setSearch,
    prompt,
    setPrompt,
  } = useStateContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setActiveMenu]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [setScreenSize]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="flex justify-between p-2 md:mx-6 relative bg-black w-900">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="white"
        icon={<AiOutlineMenu />}
      />

      {prompt && <LogoutPrompt logout={logout} />}

      <div className="flex">
        {/* ======PROFILE=== */}
        {user?.result && (
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
            {/* <img className="rounded-full w-8 h-8" alt="loading" /> */}
            <span className="text-gray-400 font-bold mr-8 text-14">
              {user?.result.name}
            </span>
          </div>
        )}

        {user?.result && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg mr-4 text-14"
          />
        )}

        {user?.result ? (
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            {!prompt && (
              <Button
                size="small"
                sx={{ textTransform: "lowerCase" }}
                variant="contained"
                onClick={() => {
                  setPrompt(true);
                }}
                className="text-red-700 font-bold ml-1 text-14"
              >
                logout
              </Button>
            )}
          </div>
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => navigate("/auth")}
          >
            <p>
              <Button
                size="small"
                sx={{ textTransform: "lowerCase" }}
                variant="contained"
                onClick={() => {
                  navigate("/auth");
                }}
                className="text-gray-400 font-bold ml-1 text-14"
              >
                singIn
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
