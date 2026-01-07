import React from "react";
import { FileUpload } from "../components/FileUpload";
import SweepingHeatmap from "../components/SweepingHeatmap";
import ImageReceiver from "../components/ImageReciver";

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
      </header>

      <div
          style={{
              width:"100%",
              display: "flex",
              flexDirection: "row"
          }}
      >
          <main>
              <div className="chart-container">
                  <SweepingHeatmap width={900} height={500} />
              </div>
          </main>
          <div

              style={{
                  width:"100%",
                  display: "flex",
                  flexDirection: "column"
              }}
          >
              <div className="imgRecvBox"
                   style={{backgroundColor: "red", width: "550px", height: "300px", marginLeft:"20px"}}>
              </div>
              <div className="timeRecvBox"
                   style={{backgroundColor: "green", width: "550px", height: "160px", marginLeft:"20px", marginTop: "40px"}}>
              </div>
          </div>

      </div>
    </div>
  );
};

export default Receiver;
