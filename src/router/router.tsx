import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import {getAuth} from "firebase/auth";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

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