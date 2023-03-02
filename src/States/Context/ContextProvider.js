import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
// import FormatDate from "../../Utils/FormatDate";

const stateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState();
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [search, setSearch] = useState("");
  const [prompt, setPrompt] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [error, setError] = useState(false);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const { inventory, loading } = useSelector((state) => state.inventory);

  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id;

  const showByCreator = inventory.filter((p) =>
    creator ? p.creator === creator : null
  );

  return (
    <stateContext.Provider
      value={{
        showByCreator,
        loading,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        search,
        setSearch,
        prompt,
        setPrompt,
        snackBarOpen,
        setSnackBarOpen,
        currentId,
        setCurrentId,
        error,
        setError,
        openBackDrop,
        setOpenBackDrop,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
