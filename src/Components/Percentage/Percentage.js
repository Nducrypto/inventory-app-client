import { ArrowUpward, ArrowDownward, ArrowDropUp } from "@mui/icons-material";
import { useStateContext } from "../../States/Context/ContextProvider";

import "./percentage.css";

const Percentage = () => {
  const { inventory } = useStateContext();

  const totalCost = inventory.reduce(
    (x, y) => Number(x) + Number(y.totalCost),
    0
  );
  const OutgoingCost = inventory.reduce(
    (x, y) => Number(x) + Number(y.outgoingCost),
    0
  );
  const profitPercent = OutgoingCost - (totalCost / totalCost) * 100;

  const quantitySold = inventory.reduce(
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
          <span>{inventory.length}</span>
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
