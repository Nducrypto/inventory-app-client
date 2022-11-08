import {
  Paper,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { getTransaction } from "../../States/Actions/InventoryActions";
import { useStateContext } from "../../States/Context/ContextProvider";

const Details = () => {
  const { handleTotal, showByCreator } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const { inventory } = useSelector((state) => state.inventory);

  const recommendedTransactions = showByCreator.filter(
    (p) => (p._id !== id) & (p.category === inventory.category)
  );
  useEffect(() => {
    dispatch(getTransaction(id));
  }, [id, dispatch]);

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Paper
        elevation={9}
        sx={{
          textAlign: "center",
          marginTop: { xs: "6rem", md: "3rem", sm: "4rem", lg: "3rem" },
        }}
      >
        <Typography variant="h5">{inventory.type}</Typography>
        <Typography variant="h4">{inventory.category}</Typography>
        <div>{moment(inventory.date).format("MMMM Do YYYY, dddd")}</div>
        <div>Quantity : {inventory.quantity}</div>
        <div>Price = ${inventory.price}</div>
        <div>Total Amount = ${inventory.amount}</div>
        {/* </>
        )} */}

        {/* TOTAL DIV  */}
        <div style={{ marginTop: "2rem" }}>
          TOTAL {inventory.type} Details of {inventory.category}
          {handleTotal(inventory.type, inventory.category)}
        </div>
      </Paper>
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        Other Related Transactions
      </div>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {recommendedTransactions.map((t) => (
          <Grid item xs={8} sm={4} md={4} key={t._id}>
            <Card sx={{ maxWidth: 250, marginTop: "1rem" }}>
              <CardHeader
                sx={{ maxWidth: 250 }}
                avatar={
                  <Avatar
                    sx={{
                      backgroundColor: t.type === "Incoming" ? "green" : "red",
                    }}
                  />
                }
                title={t.type}
                subheader={moment(t.date).format("MM Do YYYY")}
              />
              <CardContent>
                <Typography sx={{ textAlign: "center" }}>
                  {t.quantity} {t.category}(s)
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  price : ${t.price}
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  Total : ${t.amount}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "lowerCase",
                  }}
                  onClick={() =>
                    navigate(`/${t.category}`, { state: { id: t._id } })
                  }
                >
                  view Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Details;
