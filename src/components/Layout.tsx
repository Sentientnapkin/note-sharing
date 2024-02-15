import { Outlet } from "react-router-dom"
import {userContext} from "../Context/UserContext";
import {useMemo, useState} from "react";

export default function Layout() {
  const [user, setUser] = useState(null);
  const value = useMemo(
    () => ({ user, setUser }),
    [user]
  );

  return (
    <userContext.Provider value={value}>
      <>
        <main>
          <Outlet />
        </main>
      </>
    </userContext.Provider>
  )
}