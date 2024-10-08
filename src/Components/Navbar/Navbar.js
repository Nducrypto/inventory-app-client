import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useStateContext } from "../../States/Context/ContextProvider";
import { Button, Tooltip } from "@mui/material";
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
    screenSize,
    setScreenSize,
    search,
    setSearch,
    prompt,
    setPrompt,
  } = useStateContext();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [setActiveMenu, screenSize]);

  const logout = () => {
    localStorage.clear("profile");
  };

  return (
    <div
      style={{ backgroundColor: "#FEF9F3" }}
      className="flex justify-between p-2 md:mx-6 relative w-900"
    >
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="blue"
        icon={<AiOutlineMenu />}
      />

      {prompt && <LogoutPrompt logout={logout} />}

      <div className="flex">
        {user?.result && (
          <input
            style={{
              width: "6.5rem",
              height: "2rem",
              marginRight: "2rem",
              marginTop: "0.3rem",
            }}
            className="placeholder:italic placeholder:text-slate-400 rounded-md py-2 pl-4 pr-3 focus:outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
          />
        )}

        {user?.result ? (
          <div className="flex items-center gap-2 cursor-pointer p-1 secondary-dark-bg rounded-lg">
            {!prompt && (
              <Button
                size="small"
                sx={{ textTransform: "capitalize", backgroundColor: "red" }}
                variant="contained"
                onClick={() => {
                  setPrompt(true);
                }}
                className="text-red-700 font-bold ml-1 text-14"
              >
                Logout
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
