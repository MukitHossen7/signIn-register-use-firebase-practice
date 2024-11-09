import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const MainLayouts = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayouts;
