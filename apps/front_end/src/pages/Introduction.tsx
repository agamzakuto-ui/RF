import React from "react";
import { Link } from "react-router-dom";
import "../styles/Introduction.css";

const TransmitterIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 10a2 2 0 100-4 2 2 0 000 4z" />
    <path d="M12 12v10M8 22h8" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
    <path d="M7.05 7.05a7 7 0 010 0M4.93 4.93a10 10 0 010 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M16.95 7.05a7 7 0 000 0M19.07 4.93a10 10 0 000 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M8.5 9.5C7.5 8.5 7 7.3 7 6c0-2.8 2.2-5 5-5s5 2.2 5 5c0 1.3-.5 2.5-1.5 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M5.5 12.5C4 11 3 8.6 3 6c0-5 4-9 9-9s9 4 9 9c0 2.6-1 5-2.5 6.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const ReceiverIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" />
    <path d="M8.5 16.5a5 5 0 017 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M5 13a9 9 0 0114 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M1.5 9.5a13 13 0 0121 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const Introduction: React.FC = () => {
  return (
    <div className="introduction-page">
      <h1 className="introduction-title">CoSpec</h1>
      <p className="introduction-subtitle">Coexistence Spectrum</p>

      <div className="button-container">
        <Link to="/transmitter" className="nav-button transmitter-btn">
          <span className="button-icon">
            <TransmitterIcon />
          </span>
          TRANSMITTER
        </Link>

        <Link to="/receiver" className="nav-button receiver-btn">
          <span className="button-icon">
            <ReceiverIcon />
          </span>
          RECEIVER
        </Link>
      </div>
    </div>
  );
};

export default Introduction;