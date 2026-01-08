import React from "react";
import { FileUpload } from "../components/FileUpload";
import SweepingHeatmap from "../components/SweepingHeatmap";

const Transmitter: React.FC = () => {
  return (
    <div><div

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
        <FileUpload />
    </div>
    </div>
  );
};

export default Transmitter;
