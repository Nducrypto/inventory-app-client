import { Paper, Typography } from "@mui/material";

import React from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const Details = () => {
  const id = useLocation().state.id;
  const { data } = useFetch(`/page/${id}`);
  console.log(data);
  return (
    <div>
      <Paper
        elevation={9}
        sx={{
          textAlign: "center",
          marginTop: { xs: "8rem", md: "3rem", sm: "4rem", lg: "3rem" },
        }}
      >
        <Typography variant="h4">{data.category}</Typography>
        <div>{moment(data.date).format("MMMM Do YYYY, dddd,")}</div>
        <div
          style={{
            color: "blue",
          }}
        >
          Quantity InStock : {data.quantity}
        </div>
        <div
          style={{
            color: "blue",
          }}
        >
          Price = &#8358; {Intl.NumberFormat().format(data.price)}
        </div>
        <div
          style={{
            color: "blue",
          }}
        >
          Total Cost = &#8358; {Intl.NumberFormat().format(data.totalCost)}
        </div>
        <div
          style={{
            color: "blue",
          }}
        >
          OutGoing Cost = &#8358;{" "}
          {Intl.NumberFormat().format(data.outgoingCost)}
        </div>
        <div
          style={{
            color: "blue",
          }}
        >
          Quantity Sold ={data.quantitySold}
        </div>

        {/* TOTAL DIV  */}
        {/* <div style={{ marginTop: "2rem" }}>
          TOTAL {data.type} Details of {data.category}
        </div> */}
      </Paper>
      <div
        style={{
          marginTop: "1rem",
        }}
      ></div>
    </div>
  );
};

export default Details;
