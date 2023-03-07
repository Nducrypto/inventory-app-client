import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Container,
  CircularProgress,
} from "@mui/material";
import { useStateContext } from "../../States/Context/ContextProvider";
import PageFilled from "../PageFill/PageFill";
import { useLocation } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { deleteAll } from "../../States/Actions/InventoryActions";
import { useDispatch } from "react-redux";
import Paginate from "../Pagination/paginate";
import CustomizedSnackbar from "../SnackBar/SnackBar";
import { useState } from "react";

const Sidebar = () => {
  const useNdu = () => {
    return new URLSearchParams(useLocation().search);
  };
  const page = useNdu().get("page") || 1;
  const [currentPage, setCurrentPage] = useState(page);

  const user = JSON.parse(localStorage.getItem("profile"));

  const { inventory, loading, search, setSnackBarOpen, snackBarOpen } =
    useStateContext();
  const dispatch = useDispatch();

  const searching = inventory.filter(
    (p) =>
      p.category.toLowerCase().includes(search) ||
      p.category.includes(search) ||
      p.type.toLowerCase().includes(search) ||
      p.type.includes(search)
  );
  const first = (currentPage - 1) * 4;
  const second = currentPage * 4;
  const changer = search ? searching : inventory;

  // if (!user?.result) {
  //   return <h1>Hello</h1>;
  // }
  return (
    <Container>
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
          <CircularProgress sx={{ color: "white", marginTop: "2rem" }} />
        )}
      </div>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "green" }}>
              <TableCell sx={{ color: "white", fontSize: "1rem" }}>
                Products
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Bought
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Sold
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Instock
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Total Cost&nbsp;(&#8358;)
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Sold&nbsp;(&#8358;)
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Profit&nbsp;(&#8358;)
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!loading && !changer.length ? (
              <h1>No Item InStock</h1>
            ) : (
              changer
                ?.slice(first, second)
                .sort((a, b) => (a._id > b._id ? -1 : 1))
                .map((row) => (
                  <TableRow key={row._id}>
                    <div
                      style={{
                        position: "fixed",
                        backgroundColor: "white",
                        zIndex: "500",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: "inline-block",
                          ":first-letter": { textTransform: "uppercase" },
                        }}
                      >
                        {row.category}
                      </TableCell>
                    </div>
                    <TableCell align="right" sx={{ color: "blue" }}>
                      {row.quantityIn}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "red" }}>
                      {row.quantitySold}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "green" }}>
                      {row.quantitySold === 0
                        ? row.quantityIn
                        : row.quantityRemaining}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "blue" }}>
                      {row.totalCost}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "red" }}>
                      {row.outgoingCost}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "green" }}>
                      {!row.outgoingCost ? 0 : row.outgoingCost - row.totalCost}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "green" }}>
                      <Delete
                        onClick={() =>
                          dispatch(deleteAll(row, setSnackBarOpen))
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {user?.result && (
        <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
    </Container>
  );
};
export default Sidebar;
