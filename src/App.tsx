import React, { useEffect } from "react";
import Chat from "./components/chat/Chat";
import "./App.scss";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import Login from "./components/login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./firebase";
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorFallBack} from "./utils/ErrorFallBack";
import { login, logout } from "./features/userSlice";


function App() {
  const user = useAppSelector((state) => state.user.user);

const dispatch = useAppDispatch();

useEffect(() => {
  auth.onAuthStateChanged((loginUser) => {
    if(loginUser){
      dispatch(login({
        uid: loginUser.uid,
        photo: loginUser.photoURL,
        email: loginUser.email,
        displayName: loginUser.displayName,
      })
      );
    }else{
      dispatch(logout());
    }
  })
},[dispatch])
  return (
    <div className="App">
      {user ? (
        <>
        <ErrorBoundary FallbackComponent = {ErrorFallBack}>
          <Sidebar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <>
         <Login />
        </>
      )}
    </div>
  );
}

export default App;
