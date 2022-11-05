import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
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
  if (!user?.result) return null;
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        marginTop: { xs: "2rem", lg: "0.4rem", md: "-0.7rem", sm: "1rem" },
        marginBottom: "2rem",
      }}
    >
      {!prompt && (
        <>
          <Grid xs={6}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid xs={6}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid xs={6}>
            <TextField
              type="date"
              fullWidth
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <TextField
              type="Number"
              value={form.price}
              label="price"
              fullWidth
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="quantity"
              type="Number"
              fullWidth
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </Grid>

          <Button
            size="small"
            sx={{
              // marginLeft: "3rem",
              marginTop: "1rem",
              // marginTop: "20px",

              width: { xs: "70%", sm: "50%", lg: "50%", md: "50%" },
            }}
            variant="contained"
            // fullWidth
            onClick={handleSubmit}
          >
            submit
          </Button>
        </>
      )}
    </Grid>
  );
};

export default Form;
