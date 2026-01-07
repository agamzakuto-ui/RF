import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Receiver from "./pages/Receiver";
import Transmitter from "./pages/Transmitter";
import Spectograma from "./components/spectograma/spectograma";
import SweepingHeatmap from "./components/SweepingHeatmap";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"></header>

        <main>
          {/* <Routes>
            <Route path="/" element={<Navigate to="/receiver" replace />} />
            <Route path="/receiver" element={<Receiver />} />
            <Route path="/transmitter" element={<Transmitter />} />
          </Routes> */}
          <SweepingHeatmap width={1000} height={600} />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
