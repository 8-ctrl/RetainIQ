import { useState } from "react";
import "./App.css";
import Modal from "./Modal";
function App() {
  const [link, setLink] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <input
        type="text"
        className="border-2 border-solid border-black rounded-sm mr-4 w-3/5"
        value={link}
        readOnly
      />
      <Modal url={setLink} />
    </div>
  );
}

export default App;
