import React from "react";
import { useDispatch } from "react-redux";
import { deleteOne } from "../../States/Actions/InventoryActions";
import {
  Avatar,
  Tooltip,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { Delete, MoneyOff } from "@mui/icons-material";
import { useStateContext } from "../../States/Context/ContextProvider";
import useFetch from "../../Hooks/useFetch";
import moment from "moment";

const List = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id;

  const dispatch = useDispatch();
  const { search, setSnackBarOpen } = useStateContext();
  const { data, isLoading } = useFetch(`/page/history?creator=${creator}`);
  console.log(data);

  const searching = data.filter((p) => p.category.includes(search));

  const changer = search ? searching : data;
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{
          maxHeight: "550px",
          overflow: "auto",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : !isLoading && !changer.length ? (
          <div style={{ color: "white", marginTop: "3rem", fontSize: "2rem" }}>
            No Transaction History
          </div>
        ) : (
          changer?.map((item) => (
            <Grid item xs={10} sm={4} md={4} lg={3} key={item._id}>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {item.type}
                    <Avatar
                      sx={{
                        backgroundColor:
                          item.type === "Incoming" ? "blue" : "red",
                      }}
                    >
                      <MoneyOff />
                    </Avatar>
                  </Typography>

                  <Typography variant="h6" color="text.secondary">
                    {item.quantityIn ? item.quantityIn : item.quantityOut}{" "}
                    {item.category}(S)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price &#8358; {Intl.NumberFormat().format(item.price)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total &#8358; {Intl.NumberFormat().format(item.totalCost)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {moment(item.date).format("MMMM Do YYYY")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title="Delete">
                    <IconButton
                      sx={{
                        float: "right",
                        color: "red",
                      }}
                      size="small"
                      onClick={() => dispatch(deleteOne(item, setSnackBarOpen))}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default List;
