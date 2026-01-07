
import './App.css'
import { FileUpload } from "./components/FileUpload";
import SweepingHeatmap from './components/SweepingHeatmap'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LightningChart JS Sweeping Heatmap Demo</h1>
        <p>Real-time spectrogram with {1000 * 250} data points visible</p>
        <FileUpload />
      </header>
      
      <main>
        <div className="chart-container">
          <SweepingHeatmap width={1000} height={600} />
        </div>
      </main>
    </div>
  );
}

export default App;
