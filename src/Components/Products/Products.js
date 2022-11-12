import React from "react";
import { useDispatch } from "react-redux";
import Form from "../Form/Form";
import { deleteTransaction } from "../../States/Actions/InventoryActions";
import {
  List as MUIList,
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Slide,
  Tooltip,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Delete, MoneyOff, MoreHoriz, Visibility } from "@mui/icons-material";
import { useStateContext } from "../../States/Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setCurrentId, showByCreator, loading, search } = useStateContext();

  const searching = showByCreator.filter(
    (p) =>
      p.category.toLowerCase().includes(search) ||
      p.category.includes(search) ||
      p.type.toLowerCase().includes(search) ||
      p.type.includes(search)
  );

  const changer = search ? searching : showByCreator;

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: { xs: "4.7rem", md: "1rem", sm: "3rem" } }}
    >
      <Grid item xs={11} md={7} sm={7}>
        <div>
          <Form />
        </div>
      </Grid>
      <Grid item xs={11} md={8} sm={8}>
        <div style={{ marginTop: "2rem" }}>
          <MUIList
            dense={false}
            sx={{
              maxHeight: "350px",
              overflow: "auto",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : !changer.length & !loading ? (
              <div style={{ fontSize: "3rem" }}>No Transaction</div>
            ) : (
              changer.map((t) => (
                <Slide
                  direction="down"
                  in
                  mountOnEnter
                  unmountOnExit
                  key={t._id}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          backgroundColor:
                            t.type === "Incoming" ? "blue" : "red",
                        }}
                      >
                        <MoneyOff />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${t.category} - ${t.quantity}`}
                      secondary={`$${t.amount} - ${moment(t.date).format(
                        "M Do YYYY"
                      )}`}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Delete">
                        <IconButton
                          edge="center"
                          arial-label="delete"
                          onClick={() => dispatch(deleteTransaction(t._id))}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          edge="center"
                          arial-label="edit"
                          onClick={() => setCurrentId(t._id)}
                        >
                          <MoreHoriz />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="view">
                        <IconButton
                          edge="end"
                          arial-label="view"
                          onClick={() => {
                            navigate(`/${t.category}`, {
                              state: { id: t._id },
                            });
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Slide>
              ))
            )}
          </MUIList>
        </div>
      </Grid>
    </Grid>
  );
};

export default Products;
