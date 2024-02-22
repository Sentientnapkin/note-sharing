import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';


export default function Home() {
  const isAuthenticated = useSelector((state : any) => state.auth.isAuthenticated);
  const user = useSelector((state : any) => state.auth.user);
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