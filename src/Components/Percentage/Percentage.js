import React from "react";
import useFetch from "../../Hooks/useFetch";
import { ArrowUpward, ArrowDownward, ArrowDropUp } from "@mui/icons-material";

import "./percentage.css";
const Percentage = () => {
  const { data } = useFetch("/page/stats");
  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id;

  const showByCreator = data.filter((p) => p.creator === creator);
  const incoming = showByCreator.filter((p) => p.type === "Incoming");
  const outgoing = showByCreator.filter((p) => p.type === "Outgoing");
  const totalIncome = incoming.reduce((x, y) => x + y.amount, 0);
  const totalOutgoing = outgoing.reduce((x, y) => x + y.amount, 0);
  const total = (totalOutgoing / totalIncome) * 100;
  return (
    <div className="featured">
      <div className="featuredItemRevenue">
        <span className="featuredHeader">Revenue</span>
        <div className="featuredMoneyContainer">
          {/* %{Math.ceil(Intl.NumberFormat().format(total))}% */}%
          {Intl.NumberFormat().format(total)}
          {!total.length === 0 ? (
            <ArrowDropUp />
          ) : total < 0 ? (
            <ArrowDownward fontSize="small" sx={{ color: "red" }} />
          ) : (
            <ArrowUpward fontSize="small" sx={{ color: "yellowgreen" }} />
          )}
        </div>
      </div>
      <div className="featuredItemCost">
        <span className="featuredHeader">Cost</span>
        <div className="featuredMoneyContainer">
          <span>&#8358; {Intl.NumberFormat().format(totalIncome)}</span>
        </div>
      </div>
      <div className="featuredItemSales">
        <span className="featuredHeader">Sold</span>
        <div className="featuredMoneyContainer">
          <span>&#8358;{Intl.NumberFormat().format(totalOutgoing)}</span>
        </div>
      </div>
    </div>
  );
};

export default Percentage;
