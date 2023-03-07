import Carousel from "../Carousel/Carousel";
import Dashboard from "../Dashboard/Dashboard";
import Percentage from "../Percentage/Percentage";

const Home = () => {
  return (
    <div className="home">
      <Percentage />
      <Dashboard />
      <Carousel />
      {/* <Sidebar /> */}
    </div>
  );
};

export default Home;
