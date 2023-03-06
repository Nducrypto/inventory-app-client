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

  const { inventory, loading, history } = useSelector(
    (state) => state.inventory
  );

  return (
    <stateContext.Provider
      value={{
        inventory,
        history,
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
