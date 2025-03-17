import DriverInfo from "../components/DriverInfo";
import Menu from "../components/Menu";

function Home() {
  return (
    <div className="">
      <div className="flex flex-row">
        <Menu />
        <DriverInfo />
      </div>
    </div>
  );
}

export default Home;
