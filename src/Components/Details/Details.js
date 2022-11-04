import { Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useLocation } from "react-router-dom";
import { getTransaction } from "../../States/Actions/InventoryActions";
import { useStateContext } from "../../States/Context/ContextProvider";

const Details = () => {
  const { handleTotal, showByCreator } = useStateContext();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.state.id;
  const { inventory } = useSelector((state) => state.inventory);

  const filtered = showByCreator.filter(
    (p) => (p._id !== id) & (p.category === inventory.category)
  );
  useEffect(() => {
    dispatch(getTransaction(id));
  }, [id, dispatch]);

  return (
    <div>
      <Paper
        elevation={9}
        sx={{
          textAlign: "center",
          marginTop: { xs: "6rem", md: "3rem", sm: "4rem", lg: "3rem" },
        }}
      >
        <Typography variant="h5">{inventory.type}</Typography>
        <Typography variant="h4">{inventory.category}</Typography>
        <div>{inventory.date}</div>
        <div>Quantity = {inventory.quantity}</div>
        <div>Price = ${inventory.price}</div>
        <div>Transacttion Amount = ${inventory.amount}</div>

        {/* TOTAL DIV  */}
        <div style={{ marginTop: "2rem" }}>
          TOTAL {inventory.type} Details of {inventory.category}
          {handleTotal(inventory.type, inventory.category)}
        </div>
      </Paper>
      <div style={{ marginTop: "5rem" }}>
        POST YOU MAKE LIKE
        {filtered.map((t) => (
          <div key={t._id} style={{ marginTop: "2rem" }}>
            <div>{t.type}</div>
            <div>{t.category}</div>
            <div>{t.date}</div>
            <div>price = ${t.price}</div>
            <div>Quantity = {t.quantity}</div>
            <div>Amount = ${t.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
