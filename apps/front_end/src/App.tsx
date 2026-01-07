import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Receiver from "./pages/Receiver";
import Transmitter from "./pages/Transmitter";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"></header>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/receiver" replace />} />
            <Route path="/receiver" element={<Receiver />} />
            <Route path="/transmitter" element={<Transmitter />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
