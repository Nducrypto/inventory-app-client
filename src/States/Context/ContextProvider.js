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

  const { inventories, loading } = useSelector((state) => state.inventory);

  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id;

  const showByCreator = inventories.filter((p) =>
    creator ? p.creator === creator : null
  );

  // WATCH
  const inComingWatch = showByCreator.filter(
    (p) => (p.type === "Incoming") & (p.category === "Watch")
  );
  const outGoingWatch = showByCreator.filter(
    (p) => (p.type === "Outgoing") & (p.category === "Watch")
  );

  const inWatchReducedQuan = inComingWatch.reduce((x, y) => x + y.quantity, 0);

  const outWatchReducedQuan = outGoingWatch.reduce((x, y) => x + y.quantity, 0);

  const inWatchReducedAmount = inComingWatch.reduce((x, y) => x + y.amount, 0);

  const outWatchReducedAmount = outGoingWatch.reduce((x, y) => x + y.amount, 0);

  //  FOR SHOE
  const inShoe = showByCreator.filter(
    (p) => (p.type === "Incoming") & (p.category === "Shoe")
  );
  const outShoe = showByCreator.filter(
    (p) => (p.type === "Outgoing") & (p.category === "Shoe")
  );

  const inShoeReducedQuantity = inShoe.reduce((x, y) => x + y.quantity, 0);

  const outShoeReducedQuantity = outShoe.reduce((x, y) => x + y.quantity, 0);

  const inShoeReducedAmount = inShoe.reduce((x, y) => x + y.amount, 0);

  const outShoeReducedAmount = outShoe.reduce((x, y) => x + y.amount, 0);

  //  FOR CLOTH
  const inCloth = showByCreator.filter(
    (p) => (p.type === "Incoming") & (p.category === "Cloth")
  );
  const outCloth = showByCreator.filter(
    (p) => (p.type === "Outgoing") & (p.category === "Cloth")
  );

  const inClothReducedQuantity = inCloth.reduce((x, y) => x + y.quantity, 0);

  const outClothReducedQuantity = outCloth.reduce((x, y) => x + y.quantity, 0);

  const inClothReducedAmount = inCloth.reduce((x, y) => x + y.amount, 0);

  const outClothReducedAmount = outCloth.reduce((x, y) => x + y.amount, 0);

  //  FOR DOOR
  const inDoor = showByCreator.filter(
    (p) => (p.type === "Incoming") & (p.category === "Door")
  );
  const outDoor = showByCreator.filter(
    (p) => (p.type === "Outgoing") & (p.category === "Door")
  );

  const inDoorReducedQuantity = inDoor.reduce((x, y) => x + y.quantity, 0);

  const outDoorReducedQuantity = outDoor.reduce((x, y) => x + y.quantity, 0);

  const inDoorReducedAmount = inDoor.reduce((x, y) => x + y.amount, 0);

  const outDoorReducedAmount = outDoor.reduce((x, y) => x + y.amount, 0);

  //  FOR BAG
  const inComingBag = showByCreator.filter(
    (p) => (p.type === "Incoming") & (p.category === "Bag")
  );
  const outGoingBag = showByCreator.filter(
    (p) => (p.type === "Outgoing") & (p.category === "Bag")
  );

  const inBagReducedQuantity = inComingBag.reduce((x, y) => x + y.quantity, 0);

  const outBagReducedQuantity = outGoingBag.reduce((x, y) => x + y.quantity, 0);

  const inBagReducedAmount = inComingBag.reduce((x, y) => x + y.amount, 0);

  const outBagReducedAmount = outGoingBag.reduce((x, y) => x + y.amount, 0);

  //  HANDLETOTAL used in DETAILS
  const handleTotal = (type, category) => {
    if ((type === "Incoming") & (category === "Watch")) {
      return (
        <div>
          <div>TOTAL Quantity ={inWatchReducedQuan}</div>
          <div> TOTAL Amount =${inWatchReducedAmount}</div>
        </div>
      );
    } else if ((type === "Outgoing") & (category === "Watch")) {
      return (
        <div>
          <div>TOTAL Quantity ={outWatchReducedQuan}</div>
          <div> TOTAL Amount =${outWatchReducedAmount}</div>
        </div>
      );
    }
    if ((type === "Incoming") & (category === "Shoe")) {
      return (
        <div>
          <div>TOTAL Quantity ={inShoeReducedQuantity}</div>
          <div> TOTAL Amount =${inShoeReducedAmount}</div>
        </div>
      );
    } else if ((type === "Outgoing") & (category === "Shoe")) {
      return (
        <div>
          <div>TOTAL Quantity ={outShoeReducedQuantity}</div>
          <div> TOTAL Amount =${outShoeReducedAmount}</div>
        </div>
      );
    }
  };
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
        inComingWatch,
        outGoingWatch,
        inWatchReducedQuan,
        outWatchReducedQuan,
        inWatchReducedAmount,
        outWatchReducedAmount,
        inShoe,
        outShoe,
        inShoeReducedQuantity,
        outShoeReducedQuantity,
        inShoeReducedAmount,
        outShoeReducedAmount,
        inCloth,
        outCloth,
        inClothReducedQuantity,
        outClothReducedQuantity,
        inClothReducedAmount,
        outClothReducedAmount,
        inDoor,
        outDoor,
        inDoorReducedQuantity,
        outDoorReducedQuantity,
        inDoorReducedAmount,
        outDoorReducedAmount,
        inComingBag,
        outGoingBag,
        inBagReducedQuantity,
        outBagReducedQuantity,
        inBagReducedAmount,
        outBagReducedAmount,
        handleTotal,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
