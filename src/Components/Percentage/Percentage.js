import React from "react";
// import useFetch from "../../Hooks/useFetch";
import { ArrowUpward, ArrowDownward, ArrowDropUp } from "@mui/icons-material";
import { useStateContext } from "../../States/Context/ContextProvider";

import "./percentage.css";
const Percentage = () => {
  // const { data } = useFetch(`/page/stats`);
  const { showByCreator } = useStateContext();

  // const user = JSON.parse(localStorage.getItem("profile"));
  // const creator = user?.result._id;

  const totalCost = showByCreator.reduce(
    (x, y) => Number(x) + Number(y.totalCost),
    0
  );
  const OutgoingCost = showByCreator.reduce(
    (x, y) => Number(x) + Number(y.outgoingCost),
    0
  );
  const profitPercent = OutgoingCost - (totalCost / totalCost) * 100;

  const quantitySold = showByCreator.reduce(
    (x, y) => Number(x) + Number(y.quantitySold),
    0
  );

  return (
    <div className="featured">
      <div className="featuredItemRevenue">
        <span className="featuredHeader">Revenue</span>
        <div className="featuredMoneyContainer">
          %{Intl.NumberFormat().format(!OutgoingCost ? 0 : profitPercent)}
          {!OutgoingCost || profitPercent === 0 ? (
            <ArrowDropUp />
          ) : profitPercent < 0 ? (
            <ArrowDownward fontSize="small" sx={{ color: "red" }} />
          ) : (
            <ArrowUpward fontSize="small" sx={{ color: "yellowgreen" }} />
          )}
        </div>
      </div>
      <div className="featuredItemCost">
        <span className="featuredHeader">Items</span>
        <div className="featuredMoneyContainer">
          <span>{showByCreator.length}</span>
        </div>
      </div>
      <div className="featuredItemSales">
        <span className="featuredHeader">Quantity Sold</span>
        <div className="featuredMoneyContainer">
          <span>{quantitySold}</span>
        </div>
      </div>
    </div>
  );
};

export default Percentage;
