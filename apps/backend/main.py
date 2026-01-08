import base64
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.file_handler import convert_file_to_numpy, FileConversionError

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
connections = []
app = FastAPI(title="Cognitive Radio service", version="1.0.0")

# Configure CORS for local development
origins = [
    "http://localhost:5173",  # Vite dev server default port
    "http://localhost:3000",  # Common alternative port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    """Root endpoint for health check"""
    return {"message": "Welcome to Cognitive Radio service"}


@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok"}


@app.post("/api/getDataToSend")
async def get_data_to_send(file: UploadFile = File(...), cognitiveMode: bool = False):
    """
    Convert uploaded image or text file to numpy array format.

    Supported formats:
    - Images: JPG, JPEG, PNG, BMP
    - Text: TXT, CSV

    Args:
        file: The uploaded file
        cognitiveMode: Boolean indicating if cognitive mode is enabled

    Returns success message with details logged on server.
    """
    logger.info(f"Received file upload request: {file.filename}, cognitiveMode: {cognitiveMode}")
    try:
        # Read file content
        logger.info(f"Reading file content for: {file.filename}")
        content = await file.read()
        logger.info(f"File read complete. File size: {len(content)} bytes")
        
        # Convert file to numpy array
        logger.info(f"Starting conversion process for: {file.filename}")
        result = convert_file_to_numpy(file.filename, content)
        
        # Log the conversion result details
        logger.info(f"File conversion successful!")
        logger.info(f"  - Original filename: {result['original_filename']}")
        logger.info(f"  - File type: {result['file_type']}")
        logger.info(f"  - Array shape: {result['shape']}")
        logger.info(f"  - Data type: {result['dtype']}")
        logger.info(f"=== Conversion completed successfully ===")
        
        # Return only success message to user
        return {
            "success": True,
            "message": f"File '{file.filename}' successfully converted to numpy array and ready for transmission"
        }
        
    except FileConversionError as e:
        logger.error(f"File conversion error for {file.filename}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Server error during conversion of {file.filename}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")



@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    connections.append(ws)
    try:
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        connections.remove(ws)

@app.post("/trigger-image")
async def trigger_image(valid: bool = True):
    
    with open("image.jpg", "rb") as f:
        img_bytes = f.read()
    img_base64 = base64.b64encode(img_bytes).decode("utf-8")

    payload = {
        "type": "image",
        "is_valid_data": valid,
        "image_base64": img_base64,
        "message": "Image transmitted successfully"
    }

    for ws in connections:
        await ws.send_json(payload)

    return {"status": "sent trigger image"}

@app.post("/trigger-signal-frame")
async def trigger_signal_frame():
    for ws in connections:
        await ws.send_json({
            "type": "number_frame",
            "is_valid_data": True,
            "payload": {
                "values": [1, 2, 3, 4, 5]
            }
        })
    return {"status": "sent signal frame"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
