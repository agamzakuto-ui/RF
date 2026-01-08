import { useState } from "react";
import "../styles/FileUpload.css";

interface FileUploadResponse {
  success: boolean;
  message: string;
}

export function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: "error", text: "Please select a file first" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/getDataToSend", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.detail || `HTTP error! status: ${response.status}`
        );
      }

      const data: FileUploadResponse = await response.json();
      setMessage({
        type: "success",
        text: data.message,
      });
      setSelectedFile(null);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Upload failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload File for SDR Transmission</h2>

      <div className="upload-section">
        <p className="format-info">
          Supported formats:
          <br />
          <strong>Images:</strong> JPG, JPEG, PNG, BMP
          <br />
          <strong>Text:</strong> TXT, CSV (max 10 MB)
        </p>

        <div className="file-input-wrapper">
          <input
            type="file"
            id="file-input"
            onChange={handleFileSelect}
            accept=".jpg,.jpeg,.png,.bmp,.txt,.csv"
            disabled={loading}
          />
          <label htmlFor="file-input" className="file-label">
            {selectedFile ? `📄 ${selectedFile.name}` : "📁 Choose File"}
          </label>
        </div>

        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="upload-btn"
        >
          {loading ? "Converting..." : "Transmit"}
        </button>
      </div>

      {message && (
        <div className={`message message-${message.type}`}>{message.text}</div>
      )}
    </div>
  );
}
