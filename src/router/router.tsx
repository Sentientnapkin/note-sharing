import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/pages/Home";
import {getAuth} from "firebase/auth";
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SignUp";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader() {
      return { user: getAuth() }
    },
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      }
    ],
  },
])

export default router;