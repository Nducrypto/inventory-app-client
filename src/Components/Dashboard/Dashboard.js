import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Container,
} from "@mui/material";
import { useStateContext } from "../../States/Context/ContextProvider";
import PageFilled from "../PageFill/PageFill";
import Percentage from "../Percentage/Percentage";
import { useLocation } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { deleteAll } from "../../States/Actions/InventoryActions";
import { useDispatch } from "react-redux";
import Paginate from "../Pagination/paginate";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const { inventory, search, setSnackBarOpen } = useStateContext();
  const dispatch = useDispatch();

  const useNdu = () => {
    return new URLSearchParams(useLocation().search);
  };
  const page = useNdu().get("page") || 1;

  const searching = inventory.filter(
    (p) =>
      p.category.toLowerCase().includes(search) ||
      p.category.includes(search) ||
      p.type.toLowerCase().includes(search) ||
      p.type.includes(search)
  );

  const changer = search ? searching : inventory;
  return (
    <Container
      sx={{
        marginTop: { lg: "1.5rem", md: "1.5rem", xs: "5.5rem", sm: "3rem" },
      }}
    >
      <Percentage />

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
            {changer?.map((row) => (
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
                  {!row.quantityRemaining === 0
                    ? row.quantityRemaining
                    : row.quantityIn}
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
                    onClick={() => dispatch(deleteAll(row, setSnackBarOpen))}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paginate page={page} />
      {user?.result && <PageFilled />}
    </Container>
  );
};
export default Sidebar;
