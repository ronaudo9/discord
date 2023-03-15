import React from "react";
import Chat from "./components/chat/Chat"
import "./App.scss";
import Sidebar from "./components/Sidebar";

function App() {
  return <div className="App">
  {/*sidebar*/}
  <Sidebar />
  {/*chat*/}
  <Chat />
  </div>;
}

export default App;
