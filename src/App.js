import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import History from "./Components/History/History";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import Auth from "./Components/Auth/Auth";

import { useStateContext } from "./States/Context/ContextProvider";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Home from "./Components/Home/Home";
import { getTransactions } from "./States/Actions/InventoryActions";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

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
  const creator = user?.result._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions(creator));
  }, [dispatch, creator]);

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
        className={`dark:bg-main-dark-bg min-h-screen w-full
             ${activeMenu ? " md:ml-72" : "flex-2"}`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/productshistory"
              element={
                <ProtectedRoute>
                  <History />
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
