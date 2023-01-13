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
import Percentage from "../Percentage/Percentage";

const Sidebar = () => {
  const {
    inWatchReducedQuan,
    outWatchReducedQuan,
    inWatchReducedAmount,
    outWatchReducedAmount,

    inShoeReducedQuantity,
    outShoeReducedQuantity,
    inShoeReducedAmount,
    outShoeReducedAmount,

    inClothReducedQuantity,
    outClothReducedQuantity,
    inClothReducedAmount,
    outClothReducedAmount,

    inDoorReducedQuantity,
    outDoorReducedQuantity,
    inDoorReducedAmount,
    outDoorReducedAmount,

    inBagReducedQuantity,
    outBagReducedQuantity,
    inBagReducedAmount,
    outBagReducedAmount,
  } = useStateContext();

  const displayData = [
    {
      product: "Shoe",
      quantityInStock: inShoeReducedQuantity,
      quantitySold: outShoeReducedQuantity,
      quantityRemaining: inShoeReducedQuantity - outShoeReducedQuantity,
      totalCostAmount: inShoeReducedAmount,
      amountSold: outShoeReducedAmount,
      subTotal: inShoeReducedAmount - outShoeReducedAmount,
    },
    {
      product: "Watch",
      quantityInStock: inWatchReducedQuan,
      quantitySold: outWatchReducedQuan,
      quantityRemaining: inWatchReducedQuan - outWatchReducedQuan,
      totalCostAmount: inWatchReducedAmount,
      amountSold: outWatchReducedAmount,
      subTotal: inWatchReducedAmount - outWatchReducedAmount,
    },
    {
      product: "Cloth",
      quantityInStock: inClothReducedQuantity,
      quantitySold: outClothReducedQuantity,
      quantityRemaining: inClothReducedQuantity - outClothReducedQuantity,
      totalCostAmount: inClothReducedAmount,
      amountSold: outClothReducedAmount,
      subTotal: inClothReducedAmount - outClothReducedAmount,
    },
    {
      product: "Door",
      quantityInStock: inDoorReducedQuantity,
      quantitySold: outDoorReducedQuantity,
      quantityRemaining: inDoorReducedQuantity - outDoorReducedQuantity,
      totalCostAmount: inDoorReducedAmount,
      amountSold: outDoorReducedAmount,
      subTotal: inDoorReducedAmount - outDoorReducedAmount,
    },
    {
      product: "Bag",
      quantityInStock: inBagReducedQuantity,
      quantitySold: outBagReducedQuantity,
      quantityRemaining: inBagReducedQuantity - outBagReducedQuantity,
      totalCostAmount: inBagReducedAmount,
      amountSold: outBagReducedAmount,
      subTotal: inBagReducedAmount - outBagReducedAmount,
    },
  ];

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
                Quantity InStock
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Quantity Sold
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Quan Remaining
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Total Cost&nbsp;($)
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Amount Sold&nbsp;($)
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Sub Total&nbsp;($)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayData?.map((row, i) => (
              <TableRow key={i}>
                <div
                  style={{
                    position: "fixed",
                    backgroundColor: "white",
                    zIndex: "500",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.product}
                  </TableCell>
                </div>
                <TableCell align="right" sx={{ color: "blue" }}>
                  {row.quantityInStock}
                </TableCell>
                <TableCell align="right" sx={{ color: "red" }}>
                  {row.quantitySold}
                </TableCell>
                <TableCell align="right" sx={{ color: "green" }}>
                  {row.quantityRemaining}
                </TableCell>
                <TableCell align="right" sx={{ color: "blue" }}>
                  {row.totalCostAmount}
                </TableCell>
                <TableCell align="right" sx={{ color: "red" }}>
                  {row.amountSold}
                </TableCell>
                <TableCell align="right" sx={{ color: "green" }}>
                  {row.subTotal}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default Sidebar;
