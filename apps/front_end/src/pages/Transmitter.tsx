import React from "react";
import { FileUpload } from "../components/FileUpload";
import SweepingHeatmap from "../components/SweepingHeatmap";

const Transmitter: React.FC = () => {
  return (
    <div>
      <header className="App-header">
        <h2>Transmitter</h2>
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
};

export default Transmitter;
