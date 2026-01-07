import React from "react";
import { FileUpload } from "../components/FileUpload";
import SweepingHeatmap from "../components/SweepingHeatmap";

const Receiver: React.FC = () => {
  return (
    <div>
      <header className="App-header">
          <div

          style={{
              width:"100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
          }}
          >
              <h2  className="introduction-title">CoSpec</h2>
              <p className="introduction-subtitle">Coexistence Spectrum</p>
          </div>

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

export default Receiver;
