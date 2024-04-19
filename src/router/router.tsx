import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import {getAuth} from "firebase/auth";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import SubjectPage from "../pages/SubjectPage";
import ClassNotes from "../pages/ClassNotes";
import NotesView from "../pages/NotesView";
import {Settings} from "@mui/icons-material";

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
        path: ":subject",
        element: <SubjectPage />
      },
      {
        path: ":subject/:classId",
        element: <ClassNotes/>
      },
      {
        path: ":subject/:classId/:noteId",
        element: <NotesView />
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      }
    ],
  },
])

export default router;