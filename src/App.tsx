import { ToastContainer } from "react-toastify";
import "./App.css";
import { Cartlist } from "./components/cartlist";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Cartlist />
      <ToastContainer autoClose={1000}/>
    </div>
  );
}

export default App;
