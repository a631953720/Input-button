import React from "react";
import { RoomAllocation } from "./features/RoomAllocation";
import "./css/components.css";

function App() {
  return <RoomAllocation guest={10} room={3} onChange={(result) => console.log(result)} />;
}

export default App;
