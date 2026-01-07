import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.file_handler import convert_file_to_numpy, FileConversionError

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

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
async def get_data_to_send(file: UploadFile = File(...)):
    """
    Convert uploaded image or text file to numpy array format.
    
    Supported formats:
    - Images: JPG, JPEG, PNG, BMP
    - Text: TXT, CSV
    
    Returns success message with details logged on server.
    """
    logger.info(f"Received file upload request: {file.filename}")
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
