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

import React from "react";
import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../States/Context/ContextProvider";
import useFetch from "../../Hooks/useFetch";
const Details = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  // console.log(category);
  const id = useLocation().state.id;
  const { handleTotal, showByCreator } = useStateContext();
  const { data } = useFetch(`/page/${id}`);

  const recommendedTransactions = showByCreator.filter((p) =>
    id ? (p._id !== id) & (p.category === category) : null
  );

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Paper
        elevation={9}
        sx={{
          textAlign: "center",
          marginTop: { xs: "6rem", md: "3rem", sm: "4rem", lg: "3rem" },
        }}
      >
        <Typography variant="h5">{data.type}</Typography>
        <Typography variant="h4">{data.category}</Typography>
        <div>{moment(data.date).format("MMMM Do YYYY, dddd, hm:mm")}</div>
        <div
          style={{
            color: data.type === "Incoming" ? "blue" : "red",
          }}
        >
          Quantity : {data.quantity}
        </div>
        <div
          style={{
            color: data.type === "Incoming" ? "blue" : "red",
          }}
        >
          Price = ${data.price}
        </div>
        <div
          style={{
            color: data.type === "Incoming" ? "blue" : "red",
          }}
        >
          Total Amount = ${data.amount}
        </div>
        {/* </>
        )} */}

        {/* TOTAL DIV  */}
        <div style={{ marginTop: "2rem" }}>
          TOTAL {data.type} Details of {data.category}
          {handleTotal(data.type, data.category)}
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
                      backgroundColor: t.type === "Incoming" ? "blue" : "red",
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
