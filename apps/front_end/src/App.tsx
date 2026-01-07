<<<<<<< HEAD
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Receiver from "./pages/Receiver";
import Transmitter from "./pages/Transmitter";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"></header>
=======

import './App.css'
import FileUploadButton from './components/inputFile'
import Spectograma from './components/spectograma/spectograma'
import SweepingHeatmap from './components/SweepingHeatmap'

const App = () => {
  return (
      <Spectograma/>
  )
}
>>>>>>> StyleSpect

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
