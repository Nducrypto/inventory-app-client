import React, { useEffect } from "react";

import { ArrowUpward, ArrowDownward, ArrowDropUp } from "@mui/icons-material";
import { useStateContext } from "../../States/Context/ContextProvider";
import { getProductsPerc } from "../../States/Actions/InventoryActions";

import "./percentage.css";
import { useDispatch } from "react-redux";

const Percentage = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id;
  const { getData } = useStateContext();

  useEffect(() => {
    dispatch(getProductsPerc(creator));
  }, [dispatch, creator]);

  const totalCost = getData.reduce(
    (x, y) => Number(x) + Number(y.totalCost),
    0
  );
  const OutgoingCost = getData.reduce(
    (x, y) => Number(x) + Number(y.outgoingCost),
    0
  );
  const profitPercent = OutgoingCost - (totalCost / totalCost) * 100;

  const quantitySold = getData.reduce(
    (x, y) => Number(x) + Number(y.quantitySold),
    0
  );

  return (
    <div className="featured">
      {/* sx={{
        marginTop: { lg: "1.5rem", md: "1.5rem", xs: "5.5rem", sm: "3rem" },
      }} */}
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
          <span>{getData.length}</span>
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
