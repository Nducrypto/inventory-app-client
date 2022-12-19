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
import Profile from "./Components/Profile/Profile";

function App() {
  const ProtectedRoute = ({ children }) => {
    if (user?.result) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };
  const AuthProtectedRoute = ({ children }) => {
    if (!user?.result) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

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
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:category"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth"
              element={
                <AuthProtectedRoute>
                  <Auth />
                </AuthProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
