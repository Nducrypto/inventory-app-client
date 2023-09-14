import { ArrowUpward, ArrowDownward, ArrowDropUp } from "@mui/icons-material";
import { useStateContext } from "../../States/Context/ContextProvider";
import { useMemo } from "react";
import OutOfStock from "./OutOfStock";
import "./percentage.css";

const Percentage = () => {
  const { inventory } = useStateContext();

  const calculateProfitPercentage = useMemo(() => {
    if (inventory.length < 1) {
      return [];
    }
    let total = 0;
    let outgoing = 0;
    for (const product of inventory) {
      total += product.totalCost;
      outgoing += product.outgoingCost;
    }
    const display = displayProfitPercentage(outgoing, total);
    return display;
  }, [inventory]);

  function displayProfitPercentage(outgoing, total) {
    if (!outgoing) {
      return 0;
    } else if (total === 0) {
      return 0;
    } else {
      const profitPercent = ((outgoing - total) / total) * 100;
      return profitPercent;
    }
  }
  return (
    <div className="featured">
      <div className="featuredItemRevenue">
        <span className="featuredHeader">Revenue</span>
        <div className="featuredMoneyContainer">
          %{Intl.NumberFormat().format(calculateProfitPercentage)}
          {calculateProfitPercentage === 0 ? (
            <ArrowDropUp />
          ) : calculateProfitPercentage < 0 ? (
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
      <OutOfStock />
    </div>
  );
};

export default Percentage;
