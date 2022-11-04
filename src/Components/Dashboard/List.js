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
} from "@mui/material";
import { Delete, MoneyOff, MoreHoriz, Visibility } from "@mui/icons-material";
import { useStateContext } from "../../States/Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setCurrentId, showByCreator, search, setSearch } = useStateContext();

  const searching = showByCreator.filter(
    (p) =>
      p.category.toLowerCase().includes(search) || p.category.includes(search)
  );

  const changer = search ? searching : showByCreator;
  return (
    <Paper sx={{ marginTop: "2rem" }}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <MUIList
        dense={false}
        sx={{
          maxHeight: "200px",
          // maxHeight: "130px",
          overflow: "auto",
        }}
      >
        {changer.map((t) => (
          <Slide direction="down" in mountOnEnter unmountOnExit key={t._id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: t.type === "Incoming" ? "green" : "red",
                  }}
                >
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${t.category} - ${t.quantity}`}
                secondary={`$${t.amount}`}
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
                    onClick={() =>
                      navigate(`/${t.category}`, { state: { id: t._id } })
                    }
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))}
      </MUIList>
    </Paper>
  );
};

export default List;
