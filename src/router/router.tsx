import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/pages/Home";
import {getAuth} from "firebase/auth";
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import TopicNotes from "../components/pages/TopicNotes";
import NotesView from "../components/pages/NotesView";
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
        path: "topic/:topicId",
        element: <TopicNotes />
      },
      {
        path: "topic/:topicId/note/:noteId",
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