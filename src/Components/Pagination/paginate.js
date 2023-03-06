/* eslint-disable react/jsx-props-no-spreading */

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem, Paper } from "@mui/material";

const Paginate = ({ currentPage, setCurrentPage }) => {
  const { inventory } = useSelector((state) => state.inventory);

  const totalPage = Math.ceil(inventory.length / 4);

  return (
    <Paper
      sx={{
        width: { xs: "60%", md: "20%", sm: "30%" },
        margin: { sm: "2% 34%", xs: "2% 19%", md: "1% 40%" },
      }}
    >
      <Pagination
        sx={{ display: "flex", justifyContent: "space-evenly" }}
        count={totalPage}
        page={Number(currentPage) || 1}
        color="secondary"
        onChange={(e, value) => {
          setCurrentPage(value);
        }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/?page=${item.page}`}
          />
        )}
      />
      {/* <Pagination
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
      /> */}
    </Paper>
  );
};

export default Paginate;
