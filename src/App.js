import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { getTransactions } from "./States/Actions/InventoryActions";
import Details from "./Components/Details/Details";
import Products from "./Components/Products/Products";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import Auth from "./Components/Auth/Auth";

import Dashboard from "./Components/Dashboard/Dashboard";
import { useStateContext } from "./States/Context/ContextProvider";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const { activeMenu } = useStateContext();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
    JSON.parse(localStorage.getItem("profile"));
  }, [dispatch, location]);

  return (
    <div className="flex relative ">
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}

      <div
        className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
             ${activeMenu ? " md:ml-72" : "flex-2"}`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/home"
              element={user?.result ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/products"
              element={user?.result ? <Products /> : <Navigate to="/" />}
            />
            <Route
              path="/:category"
              element={user?.result ? <Details /> : <Navigate to="/" />}
            />
            <Route
              path="/auth"
              element={!user?.result ? <Auth /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </div>

    // <div>
    //   <Grid container alignItems="center" justifyContent="center">
    //     {activeMenu && (
    //       <Grid item xs={12} md={2} sm={5}>
    //         <Sidebar />
    //         <button onClick={() => setActiveMenu(!activeMenu)}>cli</button>
    //       </Grid>
    //     )}
    //     <Grid item xs={11} md={9} sm={9}>
    //       <div style={{ marginTop: "1rem" }}>
    //         <Routes>
    //           <Route path="/" element={<Dashboard />} />
    //           <Route path="/main" element={<Main />} />
    //           <Route path="/:category/:id" element={<Details />} />
    //         </Routes>
    //       </div>
    //     </Grid>
    //   </Grid>
    // </div>
  );
}

export default App;
