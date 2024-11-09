import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layout/MainLayouts";
import Home from "../Pages/Home/Home";
import LogIn from "../components/LogIn/LogIn";
import Register from "../components/Register/Register";
import CreateAccount from "../components/CreateAccount/CreateAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/createAccount",
        element: <CreateAccount></CreateAccount>,
      },
    ],
  },
]);
export default router;
