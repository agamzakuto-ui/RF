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
<<<<<<< HEAD
=======


>>>>>>> fb4db67f74ccfd2bf932b09f3e2ce556afab7ab3
    </div>
  );
};

export default Transmitter;
