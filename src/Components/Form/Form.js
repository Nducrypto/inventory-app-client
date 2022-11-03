import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { products } from "../../Objects/Objects";
import {
  createTransaction,
  updateTransaction,
} from "../../Actions/InventoryActions";
import { useSelector, useDispatch } from "react-redux";
import { useStateContext } from "../../States/Context/ContextProvider";

const Form = () => {
  const { form, setForm, initialState, currentId } = useStateContext();
  const dispatch = useDispatch();
  const { inventories } = useSelector((state) => state.inventory);

  const clickEdith = inventories.find((p) =>
    currentId ? p._id === currentId : null
  );
  const amount = form.price * form.quantity;
  useEffect(() => {
    if (currentId) {
      setForm(clickEdith);
    }
  }, [setForm, currentId, clickEdith]);

  const handleSubmit = () => {
    if (currentId) {
      dispatch(updateTransaction(currentId, { ...form, amount }));
    }
    dispatch(createTransaction({ ...form, amount: amount }));
    setForm(initialState);
  };

  return (
    <div>
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

      <button onClick={handleSubmit}>sumbmi</button>
    </div>
  );
};

export default Form;
