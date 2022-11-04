import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import { products } from "../../Objects/Objects";
import {
  createTransaction,
  updateTransaction,
} from "../../States/Actions/InventoryActions";
import { useSelector, useDispatch } from "react-redux";
import { useStateContext } from "../../States/Context/ContextProvider";

const Form = () => {
  const { form, setForm, initialState, currentId, prompt } = useStateContext();
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
    }
    dispatch(createTransaction({ ...form, amount: amount, creator: creator }));
    setForm(initialState);
  };

  return (
    <Paper
      sx={{
        padding: "0rem 0.6rem 0 2rem",
        backgroundColor: "#fffafa",
        // position: "sticky",
        marginTop: "2rem",
      }}
    >
      {!prompt && (
        <>
          <FormControl>
            <InputLabel>Type</InputLabel>

            <Select
              sx={{ width: "10rem" }}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <MenuItem value={"Incoming"}>incoming</MenuItem>
              <MenuItem value={"Outgoing"}>Outgoing</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              sx={{ width: "10rem" }}
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
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <TextField
            type="Number"
            value={form.price}
            label="price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <TextField
            label="quantity"
            type="Number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <Button
            size="small"
            sx={{
              marginLeft: "3rem",
              marginTop: "1rem",
              width: { xs: "12rem", sm: "8rem", lg: "8rem", md: "8rem" },
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            submit
          </Button>
        </>
      )}
    </Paper>
  );
};

export default Form;
