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
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
  const { showByCreator, search } = useStateContext();
  const navigate = useNavigate();

  const useNdu = () => {
    return new URLSearchParams(useLocation().search);
  };
  const product = useNdu().get("product");

  useEffect(() => {
    if (search) {
      navigate(`/?product=${search}`);
    } else {
      navigate(`/`);
    }
  }, [search, navigate]);
  const searching = showByCreator.filter(
    (p) =>
      p.category.toLowerCase().includes(product) ||
      p.category.includes(product) ||
      p.type.toLowerCase().includes(product) ||
      p.type.includes(product)
  );

  const changer = search ? searching : showByCreator;
  return (
    <Container
      sx={{
        marginTop: { lg: "1.5rem", md: "1.5rem", xs: "5.5rem", sm: "3rem" },
      }}
    >
      <Percentage />

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>Track Your Transactions From Anywhere</caption>
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
                  {row.quantity + row.quantitySold}
                </TableCell>
                <TableCell align="right" sx={{ color: "red" }}>
                  {row.quantitySold}
                </TableCell>
                <TableCell align="right" sx={{ color: "green" }}>
                  {row.quantity}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PageFilled />
    </Container>
  );
};
export default Sidebar;
