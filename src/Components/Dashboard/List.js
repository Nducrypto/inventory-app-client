import React from "react";
import { useDispatch } from "react-redux";
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
  Paper,
  CircularProgress,
} from "@mui/material";
import { Delete, MoneyOff, MoreHoriz, Visibility } from "@mui/icons-material";
import { useStateContext } from "../../States/Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setCurrentId, showByCreator, loading, search, setSnackBarOpen } =
    useStateContext();

  const searching = showByCreator.filter(
    (p) =>
      p.category.toLowerCase().includes(search) ||
      p.category.includes(search) ||
      p.type.toLowerCase().includes(search) ||
      p.type.includes(search)
  );

  const changer = search ? searching : showByCreator;
  return (
    <div style={{ marginTop: "2rem" }}>
      {!changer.length & !loading ? (
        <div style={{ fontSize: "3rem" }}>No Transaction</div>
      ) : (
        <Paper elevation={9}>
          <MUIList
            dense={false}
            sx={{
              maxHeight: "500px",
              overflow: "auto",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              changer.map((p) => (
                <Slide
                  direction="down"
                  in
                  mountOnEnter
                  unmountOnExit
                  key={p._id}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          backgroundColor:
                            p.type === "Incoming" ? "blue" : "red",
                        }}
                      >
                        <MoneyOff />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`
                      ${p.category} - ${p.quantity}
                      `}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Delete">
                        <IconButton
                          arial-label="delete"
                          onClick={() =>
                            dispatch(deleteTransaction(p._id, setSnackBarOpen))
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => setCurrentId(p._id)}>
                          <MoreHoriz />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="view">
                        <IconButton
                          onClick={() => {
                            navigate(`/${p.category}`, {
                              state: { id: p._id },
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
        </Paper>
      )}
    </div>
  );
};

export default List;
