import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getTransactions } from "./Actions/InventoryActions";
import Details from "./Components/Details/Details";
import Main from "./Components/Main/Main";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/page" />} />

        <Route path="/page" exact component={Main} />
        <Route path="/page/:category/:id" exact component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
