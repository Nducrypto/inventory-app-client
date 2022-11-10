import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../../States/Context/ContextProvider";
import { links } from "./Links";
import Auth from "../Auth/Auth";
import { Tooltip } from "@mui/material";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 500) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2";

  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-md hover:bg-secondary-dark-bg m-2";

  return (
    <div
      className="ml-3 h-screen md:overflow-hidden overflow-auto 
    md:hover:overflow-auto pb-10"
    >
      {!user?.result ? (
        <>
          <Tooltip title="Menu" position="BottomCenter">
            <button
              style={{ float: "right", color: "white" }}
              type="button"
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
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
                <div key={item.title}>
                  <p style={{ color: "white" }} className="m-3 mt-4 uppercase">
                    {item.title}
                  </p>

                  {item.link.map((Link) => (
                    <NavLink
                      to={`/${Link.name}`}
                      key={Link.name}
                      onClick={handleCloseSidebar}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? "red" : "",
                        color: "white",
                      })}
                    >
                      {Link.icon}
                      <span>{Link.name}</span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Sidebar;
