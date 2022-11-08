import * as React from "react";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Grid,
} from "@mui/material";
import { useStateContext } from "../../States/Context/ContextProvider";
import Form from "../Form/Form";
import List from "./List";

const Sidebar = () => {
  const {
    prompt,

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
      quantityReceived: inShoeReducedQuantity,
      quantityOut: outShoeReducedQuantity,
      quantityRemaining: inShoeReducedQuantity - outShoeReducedQuantity,
      amountReceived: inShoeReducedAmount,
      amountOut: outShoeReducedAmount,
      totalAmount: inShoeReducedAmount - outShoeReducedAmount,
    },
    {
      product: "Watch",
      quantityReceived: inWatchReducedQuan,
      quantityOut: outWatchReducedQuan,
      quantityRemaining: inWatchReducedQuan - outWatchReducedQuan,
      amountReceived: inWatchReducedAmount,
      amountOut: outWatchReducedAmount,
      totalAmount: inWatchReducedAmount - outWatchReducedAmount,
    },
    {
      product: "Cloth",
      quantityReceived: inClothReducedQuantity,
      quantityOut: outClothReducedQuantity,

      quantityRemaining: inClothReducedQuantity - outClothReducedQuantity,
      amountReceived: inClothReducedAmount,
      amountOut: outClothReducedAmount,
      totalAmount: inClothReducedAmount - outClothReducedAmount,
    },
    {
      product: "Door",
      quantityReceived: inDoorReducedQuantity,
      quantityOut: outDoorReducedQuantity,
      quantityRemaining: inDoorReducedQuantity - outDoorReducedQuantity,
      amountReceived: inDoorReducedAmount,
      amountOut: outDoorReducedAmount,
      totalAmount: inDoorReducedAmount - outDoorReducedAmount,
    },
    {
      product: "Bag",
      quantityReceived: inBagReducedQuantity,
      quantityOut: outBagReducedQuantity,
      quantityRemaining: inBagReducedQuantity - outBagReducedQuantity,
      amountReceived: inBagReducedAmount,
      amountOut: outBagReducedAmount,
      totalAmount: inBagReducedAmount - outBagReducedAmount,
    },
  ];

  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      container
      sx={{
        marginTop: { lg: "1.5rem", md: "1.5rem", xs: "4rem", sm: "3rem" },
      }}
    >
      <Grid item xs={11} lg={11} sm={10.5} md={11}>
        <div>
          <Form />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption>Track Your Transactions From Anywhere you are</caption>
            <TableHead>
              <TableRow sx={{ backgroundColor: "white" }}>
                <TableCell sx={{ color: "green", fontSize: "1.5rem" }}>
                  Products
                </TableCell>
                <TableCell align="right" sx={{ color: "blue" }}>
                  Quantity Received
                </TableCell>
                <TableCell align="right" sx={{ color: "red" }}>
                  Quantity Outgoing
                </TableCell>
                <TableCell align="right" sx={{ color: "green" }}>
                  Quantity Remaining
                </TableCell>
                <TableCell align="right" sx={{ color: "blue" }}>
                  Amount Received&nbsp;($)
                </TableCell>
                <TableCell align="right" sx={{ color: "red" }}>
                  Amount Spent&nbsp;($)
                </TableCell>
                <TableCell align="right" sx={{ color: "green" }}>
                  Total Amount&nbsp;($)
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.product}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "blue" }}>
                    {row.quantityReceived}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "red" }}>
                    {row.quantityOut}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "green" }}>
                    {row.quantityRemaining}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "blue" }}>
                    {row.amountReceived}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "red" }}>
                    {row.amountOut}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "green" }}>
                    {row.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>{!prompt && <List />}</div>
      </Grid>
    </Grid>
  );
};
export default Sidebar;
