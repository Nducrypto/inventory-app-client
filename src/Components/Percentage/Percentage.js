import { ArrowUpward, ArrowDownward, ArrowDropUp } from "@mui/icons-material";
import { useStateContext } from "../../States/Context/ContextProvider";

import "./percentage.css";
import { useEffect, useState } from "react";

const Percentage = () => {
  const { inventory } = useStateContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);

  const outOfStockItems = inventory.filter(
    (item) => item.quantityRemaining === 0
  );
  const category = outOfStockItems[currentIndex];

  // get last index in Array
  const arrayLength = outOfStockItems.length - 1;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // % modulo operation  ensures that when currentIndex reaches the length of the array, it wraps around and starts from 0 again
  //     setCurrentIndex((prev) => (prev + 1) % arrayLength);
  //   }, 300);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [arrayLength]);

  useEffect(() => {
    if (outOfStockItems.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex === arrayLength ? 0 : (prev) => prev + 1);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [arrayLength, currentIndex, outOfStockItems]);

  const totalCost = inventory.reduce(
    (x, y) => Number(x) + Number(y.totalCost),
    0
  );
  const outgoingCost = inventory.reduce(
    (x, y) => Number(x) + Number(y.outgoingCost),
    0
  );
  const profitPercent = ((outgoingCost - totalCost) / totalCost) * 100;

  return (
    <div className="featured">
      <div className="featuredItemRevenue">
        <span className="featuredHeader">Revenue</span>
        <div className="featuredMoneyContainer">
          %{Intl.NumberFormat().format(!outgoingCost ? 0 : profitPercent)}
          {!outgoingCost || profitPercent === 0 ? (
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
          <span>{inventory.length}</span>
        </div>
      </div>
      <div className="featuredItemSales">
        <span className="featuredHeader">Out of stock</span>
        <div className="featuredMoneyContainer">
          <span>{outOfStockItems.length}</span>
          <span>{category?.category}</span>
        </div>
      </div>
    </div>
  );
};

export default Percentage;
