import Dashboard from "../Dashboard/Dashboard";
import Percentage from "../Percentage/Percentage";
import "./Home.css";
const Home = () => {
  return (
    <div className="container">
      <Percentage />
      <Dashboard />
    </div>
  );
};

export default Home;
