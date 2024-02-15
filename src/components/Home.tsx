import React, {useEffect} from 'react';
import {userContext} from "../Context/UserContext";
import {useNavigate} from "react-router-dom";


export default function Home() {
  const {user, setUser} = React.useContext(userContext);
  const navigate = useNavigate();
    useEffect(() => {
      if (user === null) {
      navigate('/login');
    }
  });

  return (
    <div>
      <h1>Welcome to Athenian High School's Note Sharing Website</h1>
      <p>Here you can find notes from your classmates, or share your own notes with others.</p>
      <p>Click on the "Notes" tab to get started.</p>
    </div>
  );
}