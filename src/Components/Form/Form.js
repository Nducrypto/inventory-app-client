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
};

const Form = () => {
  const [form, setForm] = useState(initialState);
  const {
    currentId,
    setCurrentId,
    setSnackBarOpen,
    snackBarOpen,
    loading,
    inventory,
    setError,
    error,
    openBackDrop,
    setOpenBackDrop,
  } = useStateContext();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id;

  const clickEdith = inventory.find((p) =>
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
    const findMe = inventory?.find((p) => p.category === form.category);
    console.log(findMe);
    if (
      findMe &&
      form.quantity > findMe?.quantityRemaining &&
      form.type === "Outgoing"
    ) {
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
      setForm(initialState);
    }
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
      <input
        style={{
          marginTop: ".5rem",
          width: "100%",
          background: "transparent",
          border: "1px solid blue",
          height: "3rem",
        }}
        placeholder="Category"
        value={form.category}
        onChange={(e) => {
          setForm({ ...form, category: e.target.value.toUpperCase() });
          setError(false);
        }}
        list="browsers"
      />
      <datalist id="browsers">
        {inventory?.map((item) => (
          <option value={item.category} />
        ))}
      </datalist>

      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>

        <Select
          fullWidth
          value={form.type}
          onChange={(e) => {
            setForm({ ...form, type: e.target.value });
            // setError(false);
          }}
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
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        type="date"
        size="small"
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
        fullWidth
        size="small"
        label="Price"
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />

      <TextField
        sx={{
          marginTop: ".5rem",
        }}
        label="quantity"
        type="number"
        size="small"
        fullWidth
        value={form.quantity}
        onChange={(e) => {
          setError(false);
          setForm({ ...form, quantity: Number(e.target.value) });
        }}
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
