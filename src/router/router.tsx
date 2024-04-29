import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import {getAuth} from "firebase/auth";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import SubjectPage from "../pages/SubjectPage";
import ClassNotes from "../pages/ClassNotes";
import NotePDFView from "../pages/NotePDFView";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";

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
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: ":subject",
        element: <SubjectPage />
      },
      {
        path: ":subject/:classId",
        element: <ClassNotes/>
      },
      {
        path: ":subject/:classId/:noteId",
        element: <NotePDFView />
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      }
    ],
  },
])

export default router;