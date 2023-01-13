import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { products } from "../../Objects/Objects";
import {
  createTransaction,
  updateTransaction,
} from "../../States/Actions/InventoryActions";
import { useSelector, useDispatch } from "react-redux";
import { useStateContext } from "../../States/Context/ContextProvider";
import CustomizedSnackbar from "../SnackBar/SnackBar";
import FormatDate from "../../Utils/FormatDate";

const initialState = {
  type: "",
  category: "",
  date: FormatDate(new Date()),
  quantity: "",
  price: "",
  amount: "",
};

const Form = () => {
  const [form, setForm] = useState(initialState);
  const { currentId, setSnackBarOpen, snackBarOpen } = useStateContext();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id;

  const { inventories } = useSelector((state) => state.inventory);

  const clickEdith = inventories.find((p) =>
    currentId ? p._id === currentId : null
  );
  const amount = form.price * form.quantity;
  useEffect(() => {
    if (currentId) {
      setForm(clickEdith);
    }
  }, [clickEdith, setForm, currentId]);

  const handleSubmit = () => {
    if (currentId) {
      dispatch(
        updateTransaction(currentId, {
          ...form,
          amount: amount,
          creator: creator,
        })
      );
    } else {
      dispatch(
        createTransaction(
          { ...form, amount: amount, creator: creator },
          setSnackBarOpen
        )
      );
    }
    setForm(initialState);
  };

  if (!user?.result) return null;

  return (
    <Paper
      elevation={7}
      sx={{
        width: "70%",
        marginTop: { xs: "2rem", lg: "0.4rem", md: "-0.7rem", sm: "1rem" },
        marginBottom: "2rem",
        padding: "1rem 1rem 1rem 1rem",
        margin: "0 0 0 13%",
      }}
    >
      <CustomizedSnackbar
        message={
          snackBarOpen === "delete"
            ? "Deleted Successfully"
            : snackBarOpen === "create"
            ? "Created Successfully"
            : ""
        }
      />

      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>

        <Select
          fullWidth
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <MenuItem value="Incoming">Incoming</MenuItem>
          <MenuItem value="Outgoing">Outgoing</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          sx={{
            marginTop: ".5rem",
          }}
          fullWidth
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {products.map((p) => (
            <MenuItem value={p.item} key={p.item}>
              {p.item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        sx={{
          marginTop: ".5rem",
        }}
        fullWidth
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        type="date"
        // inputProps={{
        //   min: FormatDate(new Date()),
        // }}
      />
      <TextField
        sx={{
          marginTop: ".5rem",
        }}
        type="number"
        value={form.price}
        label="price"
        fullWidth
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <TextField
        sx={{
          marginTop: ".5rem",
        }}
        label="quantity"
        type="number"
        fullWidth
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />
      <div>
        <Button
          size="small"
          sx={{
            marginTop: "1rem",
            width: "100%",
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          submit
        </Button>
      </div>
    </Paper>
  );
};

export default Form;
