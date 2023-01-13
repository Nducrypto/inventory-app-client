import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../../States/Context/ContextProvider";
import { links } from "./Links";
import Auth from "../Auth/Auth";
import { Tooltip } from "@mui/material";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, prompt } = useStateContext();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 500) {
      setActiveMenu(false);
    }
  };

  const handleBackground = (name) => {
    if ((location.pathname === "/") & (name === "Home")) {
      return "orange";
    } else if (
      (location.pathname === "/addproduct") &
      (name === "AddProduct")
    ) {
      return "orange";
    } else if ((location.pathname === "/profile") & (name === "Profile")) {
      return "orange";
    } else {
      return "darkred";
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2";

  return (
    <>
      {prompt ? null : (
        <div
          className="h-screen md:overflow-hidden overflow-auto 
    md:hover:overflow-auto"
        >
          {!user?.result ? (
            <>
              <Tooltip title="Menu" position="BottomCenter">
                <button
                  style={{ float: "right", color: "white" }}
                  type="button"
                  onClick={() =>
                    setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                  }
                  className="text-xl rounded-full p-3 mt-4 block "
                >
                  <MdOutlineCancel />
                </button>
              </Tooltip>
              <Auth />
            </>
          ) : (
            activeMenu && (
              <>
                <div className="flex justify-between items-center gap-3">
                  <Link
                    to="/"
                    onClick={handleCloseSidebar}
                    className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900"
                  >
                    <span style={{ color: "white" }}>Inventory</span>
                  </Link>

                  <Tooltip title="Menu" position="BottomCenter">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                      }
                      className="text-xl rounded-full p-3 mt-4 block "
                    >
                      <MdOutlineCancel />
                    </button>
                  </Tooltip>
                </div>

                <div className="mt-10">
                  {links.map((item) => (
                    <NavLink
                      to={`/${item.url}`}
                      key={item.name}
                      onClick={handleCloseSidebar}
                      className={activeLink}
                      style={{
                        backgroundColor: handleBackground(item.name),
                        color: "white",
                      }}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              </>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
