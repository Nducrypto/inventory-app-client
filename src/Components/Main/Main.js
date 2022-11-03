import React from "react";
import { useDispatch } from "react-redux";
import Form from "../Form/Form";
import { deleteTransaction } from "../../Actions/InventoryActions";
import { Card, CardContent, Typography } from "@mui/material";
import { useStateContext } from "../../States/Context/ContextProvider";
import { useHistory } from "react-router-dom";

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    inventories,
    setCurrentId,

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

  return (
    <div>
      <div style={{ marginTop: "3rem" }}>
        <Form />
      </div>
      <div>
        {inventories.map((t) => (
          <Card key={t._id} sx={{ marginTop: "2rem" }}>
            <CardContent
              onClick={() => history.push(`/page/${t.category}/${t._id}`)}
            >
              <Typography>category :{t.category}</Typography>
              <Typography>type :{t.type}</Typography>
              <Typography>date :{t.date}</Typography>
              <Typography>quantity :{t.quantity}</Typography>
              <Typography>price :{t.price}</Typography>
              <Typography>${t.amount}</Typography>
            </CardContent>

            <button onClick={() => dispatch(deleteTransaction(t._id))}>
              delete
            </button>
            <button onClick={() => setCurrentId(t._id)}>edit</button>
          </Card>
        ))}
      </div>
      <div>
        <h4>Watch</h4>
        <div>Total quantity received = {inWatchReducedQuan}</div>
        <div>Total quantity outgoing ={outWatchReducedQuan}</div>
        <div>
          remaining quantity ={inWatchReducedQuan - outWatchReducedQuan}
        </div>
        <div>Total amount received = ${inWatchReducedAmount}</div>
        <div>Total outgoing amount = ${outWatchReducedAmount}</div>
        <div>
          remaining amount =${inWatchReducedAmount - outWatchReducedAmount}
        </div>

        {/* SHOE */}
        <div>
          <h4>Shoe</h4>
          <div>total received = {inShoeReducedQuantity}</div>
          <div>total outgoing ={outShoeReducedQuantity}</div>
          <div>remaining ={inShoeReducedQuantity - outShoeReducedQuantity}</div>
          <div>total received amount = {inShoeReducedAmount}</div>
          <div>total outgoing amount ={outShoeReducedAmount}</div>
          <div>remaining = ${inShoeReducedAmount - outShoeReducedAmount}</div>
        </div>

        {/* Cloth  */}
        <h4>Cloth</h4>
        <div>total received = {inClothReducedQuantity}</div>
        <div>total outgoing ={outClothReducedQuantity}</div>
        <div>remaining ={inClothReducedQuantity - outClothReducedQuantity}</div>
        <div>total received = ${inClothReducedAmount}</div>
        <div>
          total outgoing =$
          {outClothReducedAmount}
        </div>

        <div>
          remaining amount = ${inClothReducedAmount - outClothReducedAmount}
        </div>

        {/* DOOR  */}
        <h4>DOOR</h4>
        <div>total received = {inDoorReducedQuantity}</div>
        <div>total outgoing ={outDoorReducedQuantity}</div>
        <div>remaining ={inDoorReducedQuantity - outDoorReducedQuantity}</div>
        <div>total received = ${inDoorReducedAmount}</div>
        <div>
          total outgoing =$
          {outDoorReducedAmount}
        </div>

        <div>
          remaining amount = ${inDoorReducedAmount - outDoorReducedAmount}
        </div>

        {/* BAG */}
        <h4>BAG</h4>
        <div>total received = {inBagReducedQuantity}</div>
        <div>total outgoing ={outBagReducedQuantity}</div>
        <div>remaining ={inBagReducedQuantity - outBagReducedQuantity}</div>
        <div>total received = ${inBagReducedAmount}</div>
        <div>
          total outgoing =$
          {outBagReducedAmount}
        </div>

        <div>
          remaining amount = ${inBagReducedAmount - outBagReducedAmount}
        </div>
      </div>
    </div>
  );
};

export default Main;
