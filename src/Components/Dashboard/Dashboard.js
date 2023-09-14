import { LinearProgress } from "@mui/material";
import { useStateContext } from "../../States/Context/ContextProvider";
import PageFilled from "../PageFill/PageFill";
import { useLocation } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { deleteAll } from "../../States/Actions/InventoryActions";
import { useDispatch } from "react-redux";
import Paginate from "../Pagination/paginate";
import CustomizedSnackbar from "../SnackBar/SnackBar";
import { useState } from "react";
import "./dashboard.css";

const Sidebar = (value) => {
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page") || 1;
  const [currentPage, setCurrentPage] = useState(page);

  const user = JSON.parse(localStorage.getItem("profile"));

  const { inventory, loading, search, setSnackBarOpen, snackBarOpen } =
    useStateContext();
  const dispatch = useDispatch();

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const conditionalContentDisplay = () => {
    if (search) {
      return inventory.filter(
        (p) =>
          p.category.toLowerCase().includes(search) ||
          p.category.includes(search) ||
          p.type.toLowerCase().includes(search) ||
          p.type.includes(search)
      );
    } else {
      return inventory;
    }
  };
  return (
    <div className="dashboard-container">
      <CustomizedSnackbar
        message={
          snackBarOpen === "create"
            ? "Item Added Successfully"
            : snackBarOpen === "delete"
            ? "Deleted Successfully"
            : false
        }
      />

      {user?.result && <PageFilled />}
      <div style={{ textAlign: "center" }}>
        {user?.result && loading && (
          <LinearProgress
            sx={{ backgroundColor: "yellow", fontSize: "1rem" }}
          />
        )}
      </div>

      <div className="orders-list-table-container">
        <table className="order-list-table">
          <thead>
            <tr className="table-header">
              <th className="table-header">Products</th>
              <th className="table-header">Quantity Bought</th>
              <th className="table-header">Quantity Sold</th>
              <th className="table-header">Quantity Instock</th>
              <th className="table-header">Total Cost&nbsp;(&#8358;)</th>
              <th className="table-header">Sold&nbsp;(&#8358;)</th>
              <th className="table-header">Profit&nbsp;(&#8358;)</th>
              <th className="table-header">Delete</th>
            </tr>
          </thead>

          <tbody>
            {!loading && conditionalContentDisplay().length === 0 ? (
              <h1>No Item InStock</h1>
            ) : (
              conditionalContentDisplay()
                ?.slice(startIndex, endIndex)
                .sort((a, b) => b._id.localeCompare(a._id))
                .map((item) => (
                  <tr key={item._id} className="user-row">
                    <td>{item.category}</td>

                    <td>{item.quantityIn}</td>
                    <td>{item.quantitySold}</td>
                    <td
                      align="right"
                      style={{
                        color: item.quantityRemaining === 0 ? "red" : "green",
                        fontSize: item.quantityRemaining === 0 && "1.2rem",
                      }}
                    >
                      {item.quantityRemaining}
                    </td>
                    <td>
                      &#8358;{" "}
                      {Intl.NumberFormat().format(item.totalCost.toFixed(2))}
                    </td>
                    <td>
                      &#8358;{" "}
                      {Intl.NumberFormat().format(item.outgoingCost.toFixed(2))}
                    </td>
                    <td>
                      {item.outgoingCost === 0
                        ? 0
                        : item.outgoingCost - item.totalCost}
                    </td>
                    <td>
                      <Delete
                        sx={{ color: "red", fontSize: "1.2rem" }}
                        onClick={() =>
                          dispatch(deleteAll(item, setSnackBarOpen))
                        }
                      />
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      {user?.result && (
        <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};
export default Sidebar;
