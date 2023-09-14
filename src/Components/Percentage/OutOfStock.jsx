import React, { useEffect, useState } from "react";
import { useStateContext } from "../../States/Context/ContextProvider";
import "./percentage.css";
const OutOfStock = () => {
  const { inventory } = useStateContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getOutOfStockItem = inventory.filter(
    (item) => item.quantityRemaining === 0
  );
  const category = getOutOfStockItem[currentIndex]?.category;

  const lastIndex = getOutOfStockItem.length - 1;

  useEffect(() => {
    if (getOutOfStockItem.length > 0) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex === lastIndex ? 0 : (prev) => prev + 1);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentIndex, lastIndex, getOutOfStockItem.length]);
  return (
    <div className="featuredItemSales">
      <span className="featuredHeader">Out of stock</span>
      <div className="featuredMoneyContainer">
        <span>{getOutOfStockItem.length}</span>
        <span>{category}</span>
      </div>
    </div>
  );
};

export default OutOfStock;
