import { useState } from "react";
import "../styles/FileUpload.css";
import { useNavigate } from "react-router-dom";

interface FileUploadResponse {
  success: boolean;
  message: string;
}

interface FilePreview {
  type: "image" | "text";
  content: string;
  fileName: string;
}

interface FileUploadProps {
  cognitiveMode?: boolean;
}

export function FileUpload({ cognitiveMode = false }: FileUploadProps) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
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

      // Generate preview based on file type
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const isImage = ["jpg", "jpeg", "png", "bmp"].includes(
        fileExtension || ""
      );
      const isText = ["txt", "csv"].includes(fileExtension || "");

      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setFilePreview({
              type: "image",
              content: e.target.result as string,
              fileName: file.name,
            });
            setShowPreviewModal(true);
          }
        };
        reader.readAsDataURL(file);
      } else if (isText) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setFilePreview({
              type: "text",
              content: e.target.result as string,
              fileName: file.name,
            });
            setShowPreviewModal(true);
          }
        };
        reader.readAsText(file);
      }
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

      const response = await fetch(`/api/getDataToSend?cognitiveMode=${cognitiveMode}`, {
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
      setFilePreview(null);
      navigate("/receiver");
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
      <h2 style={{ color: "#ccf4f2" }}>Upload File for SDR Transmission</h2>

      <div className="upload-section">
        {/* <p className="format-info">
          Supported formats:
          <br />
          <strong>Images:</strong> JPG, JPEG, PNG, BMP
          <br />
          <strong>Text:</strong> TXT, CSV (max 10 MB)
        </p> */}

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

        {/* <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="upload-btn"
        >
          {loading ? "Converting..." : "Transmit"}
        </button> */}
      </div>

      {showPreviewModal && filePreview && (
        <div
          className="preview-modal-overlay"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="preview-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="preview-modal-close"
              onClick={() => setShowPreviewModal(false)}
            >
              ✕
            </button>

            <h3>File Preview: {filePreview.fileName}</h3>

            {filePreview.type === "image" ? (
              <div className="preview-modal-image">
                <img src={filePreview.content} alt="File preview" />
              </div>
            ) : (
              <div className="preview-modal-text">
                <pre>{filePreview.content}</pre>
              </div>
            )}

            <button
              className="preview-modal-transmit"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Converting..." : "Transmit This File"}
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className={`message message-${message.type}`}>{message.text}</div>
      )}
    </div>
  );
}
