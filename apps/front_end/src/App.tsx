import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Receiver from "./pages/Receiver";
import Transmitter from "./pages/Transmitter";
import Spectograma from "./components/spectograma/spectograma";
import FileInserting from "./pages/file_inserting_page/fileInserting";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"></header>

        <main>
          <Routes>
            <Route path="/" element={<FileInserting />} />
            <Route path="*" element={<FileInserting />} />
            <Route path="/receiver" element={<Receiver />} />
            <Route path="/transmitter" element={<FileInserting />} />
            <Route path="/Spectograma" element={<Spectograma />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
