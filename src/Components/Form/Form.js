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
import {
  createTransaction,
  updateTransaction,
} from "../../States/Actions/InventoryActions";
import { useStateContext } from "../../States/Context/ContextProvider";
import CustomizedSnackbar from "../SnackBar/SnackBar";
import FormatDate from "../../Utils/FormatDate";
import { useDispatch } from "react-redux";

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
  const {
    currentId,
    setCurrentId,
    setSnackBarOpen,
    snackBarOpen,
    loading,
    showByCreator,
    setError,
    error,
    openBackDrop,
    setOpenBackDrop,
  } = useStateContext();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id;

  const clickEdith = showByCreator.find((p) =>
    currentId ? p._id === currentId : null
  );
  const totalCost = form.price * form.quantity;
  useEffect(() => {
    if (currentId) {
      setForm(clickEdith);
    }
  }, [clickEdith, setForm, currentId]);

  // ===== HANDLESUBMIT ====
  const handleSubmit = () => {
    const findMe = showByCreator?.find(
      (p) =>
        p.category.toLowerCase().includes(form.category) ||
        p.category.toUpperCase().includes(form.category) ||
        p.category.includes(form.category)
    );

    if (findMe && findMe.quantity < form.quantity && form.type === "Outgoing") {
      setError(true);
    } else if (!findMe && form.type === "Outgoing") {
      setError(true);
    } else if (currentId) {
      dispatch(
        updateTransaction(
          currentId,
          {
            ...form,
            totalCost: totalCost,
            creator: creator,
          },
          setOpenBackDrop
        )
      );
    } else {
      dispatch(
        createTransaction(
          { ...form, totalCost: totalCost, creator: creator },
          setSnackBarOpen,
          setOpenBackDrop
        )
      );
    }
    setForm(initialState);
    setCurrentId();
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
      {error && <h1>Can't sell morethan you have</h1>}
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

      <TextField
        sx={{
          marginTop: ".5rem",
        }}
        fullWidth
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <TextField
        sx={{
          marginTop: ".5rem",
        }}
        fullWidth
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        type="date"
        inputProps={{
          min: FormatDate(new Date()),
        }}
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
          disabled={
            !form.type ||
            !form.category ||
            !form.date ||
            !form.price ||
            !form.quantity ||
            loading
          }
        >
          {currentId ? "Edit" : "submit"}
        </Button>
      </div>
      {openBackDrop && (
        <div>
          <Button
            size="small"
            sx={{
              marginTop: "1rem",
              width: "100%",
            }}
            variant="contained"
            onClick={() => setOpenBackDrop((prev) => !prev)}
          >
            close
          </Button>
        </div>
      )}
    </Paper>
  );
};

export default Form;
