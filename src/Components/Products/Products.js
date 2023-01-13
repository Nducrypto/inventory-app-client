import React from "react";
import { Grid } from "@mui/material";
import List from "../Dashboard/List";
import Form from "../Form/Form";
import { useStateContext } from "../../States/Context/ContextProvider";

const Products = () => {
  const { prompt } = useStateContext();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: { xs: "4.7rem", md: "1rem", sm: "3rem" } }}
    >
      <Grid item xs={11} md={4} sm={4}>
        <Form />
      </Grid>
      <Grid item xs={11} md={7} sm={7}>
        {!prompt && <List />}
      </Grid>
    </Grid>
  );
};

export default Products;
