import { useEffect, useState } from "react";

export default function ImageReceiver() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("Waiting for data...");
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "image":
          window.dispatchEvent(new CustomEvent("ws:image", { detail: data }));
          break;

        case "number_list":
          window.dispatchEvent(new CustomEvent("ws:numbers", { detail: data }));
          break;

        default:
          console.warn("Unknown WS message type", data);
      }
    };

    ws.onerror = () => {
      console.error("WebSocket error");
    };

    return () => ws.close();
  }, []);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");
    let opened = false;

    ws.onopen = () => {
      opened = true;
      setStatus("listening...");
      setIsError(false);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "image") {
        if (data.is_valid_data) {
          setImage(`data:image/jpeg;base64,${data.image_base64}`);
          setStatus(data.message || "Success");
          setIsError(false);
        } else {
          setImage(null);
          setStatus("The transmission failed got invalid data");
          setIsError(true);
        }
      }
    };

    ws.onerror = () => {
      // Only show error if connection never opened
      if (!opened) {
        setStatus("Failed to connect to server");
        setIsError(true);
      }
    };

    ws.onclose = () => {
      if (opened) {
        setStatus("Connection closed");
        setIsError(true);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div style={styles.container}>
      {!image &&
      <div>
       <h2 style={styles.title}>Image Receiver</h2>

      <div
        style={{
          ...styles.status,
          backgroundColor: isError ? "#ffe5e5" : "#e8f7ee",
          color: isError ? "#c62828" : "#2e7d32",
        }}
      >
        {status}
      </div></div>}

      {image && <img src={image} alt="Received" style={styles.image} />}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "300px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "16px",
  },
  status: {
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
};
