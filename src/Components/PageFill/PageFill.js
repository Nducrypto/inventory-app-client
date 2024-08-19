import { Backdrop, Button } from "@mui/material";
import { useStateContext } from "../../States/Context/ContextProvider";
import Form from "../Form/Form";

const PageFilled = () => {
  const { openBackDrop, setOpenBackDrop } = useStateContext();

  const handleToggle = () => {
    setOpenBackDrop(!openBackDrop);
  };

  return (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <Button
        size="small"
        onClick={handleToggle}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "2px 20px",
        }}
      >
        Add new item
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <Form />
      </Backdrop>
    </div>
  );
};

export default PageFilled;
