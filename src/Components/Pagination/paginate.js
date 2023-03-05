/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem, Paper } from "@mui/material";

import { getTransactions } from "../../States/Actions/InventoryActions";

const Paginate = ({ page }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id;

  const { numberOfPages } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  console.log(numberOfPages);

  useEffect(() => {
    if (page) {
      dispatch(getTransactions(page, creator));
    }
  }, [dispatch, page, creator]);

  return (
    <Paper
      sx={{
        width: { xs: "60%", md: "20%", sm: "30%" },
        margin: { sm: "2% 34%", xs: "2% 19%", md: "1% 40%" },
      }}
    >
      <Pagination
        sx={{ display: "flex", justifyContent: "space-evenly" }}
        count={numberOfPages}
        page={Number(page) || 1}
        color="secondary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/?page=${item.page}`}
          />
        )}
      />
    </Paper>
  );
};

export default Paginate;
