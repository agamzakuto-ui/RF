import numpy as np
from PIL import Image
import io
import logging
from typing import Dict, Any

# Configure logger
logger = logging.getLogger(__name__)

# Configuration constants
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_IMAGE_FORMATS = {'jpg', 'jpeg', 'png', 'bmp'}
ALLOWED_TEXT_FORMATS = {'txt', 'csv'}

class FileConversionError(Exception):
    """Custom exception for file conversion errors"""
    pass


def get_file_extension(filename: str) -> str:
    """Extract file extension from filename"""
    return filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''


def validate_file(filename: str, file_size: int) -> None:
    """Validate file type and size"""
    logger.info(f"Validating file: {filename} (size: {file_size / 1024 / 1024:.2f} MB)")
    
    if file_size > MAX_FILE_SIZE:
        raise FileConversionError(
            f"File size ({file_size / 1024 / 1024:.2f} MB) exceeds maximum allowed size (10 MB)"
        )
    
    ext = get_file_extension(filename)
    allowed = ALLOWED_IMAGE_FORMATS | ALLOWED_TEXT_FORMATS
    
    if ext not in allowed:
        raise FileConversionError(
            f"Unsupported file format '.{ext}'. Allowed formats: {', '.join(sorted(allowed))}"
        )
    
    logger.info(f"File validation passed for {filename}")


def image_to_numpy(file_content: bytes, filename: str) -> Dict[str, Any]:
    """Convert image file to numpy array"""
    try:
        logger.info(f"Starting image conversion for: {filename}")
        img = Image.open(io.BytesIO(file_content))
        logger.info(f"Image opened successfully. Original mode: {img.mode}")
        
        # Convert to RGB if necessary (handles PNG with alpha, etc.)
        if img.mode != 'RGB':
            logger.info(f"Converting image from {img.mode} to RGB")
            img = img.convert('RGB')
        
        array = np.array(img)
        logger.info(f"Image converted to numpy array. Shape: {array.shape}, dtype: {array.dtype}")
        
        result = {
            "success": True,
            "shape": list(array.shape),
            "dtype": str(array.dtype),
            "file_type": "image",
            "original_filename": filename
        }
        
        logger.info(f"Image conversion completed successfully: {filename}")
        return result
    except Exception as e:
        logger.error(f"Failed to convert image {filename}: {str(e)}")
        raise FileConversionError(f"Failed to convert image: {str(e)}")


def text_to_numpy(file_content: bytes, filename: str) -> Dict[str, Any]:
    """Convert text/CSV file to numpy array"""
    try:
        logger.info(f"Starting text file conversion for: {filename}")
        text = file_content.decode('utf-8')
        logger.info(f"Text file decoded successfully. Length: {len(text)} characters")
        
        # Try to parse as CSV/numeric data
        try:
            lines = text.strip().split('\n')
            if ',' in text:
                logger.info(f"Detected CSV format with {len(lines)} lines")
                # CSV format
                data = np.array([list(map(float, line.split(','))) for line in lines])
            else:
                logger.info("Detected space/newline separated numeric format")
                # Space or newline separated
                data = np.array([float(x) for x in text.split()])
            
            result = {
                "success": True,
                "shape": list(data.shape),
                "dtype": str(data.dtype),
                "file_type": "text",
                "original_filename": filename
            }
            logger.info(f"Text conversion completed. Shape: {data.shape}, dtype: {data.dtype}")
            return result
        except ValueError:
            logger.info("Numeric parsing failed, converting to ASCII character array")
            # If numeric parsing fails, convert to character array
            data = np.array([ord(c) for c in text])
            
            result = {
                "success": True,
                "shape": list(data.shape),
                "dtype": str(data.dtype),
                "file_type": "text_ascii",
                "original_filename": filename
            }
            logger.info(f"ASCII conversion completed. Shape: {data.shape}, dtype: {data.dtype}")
            return result
    except Exception as e:
        logger.error(f"Failed to convert text file {filename}: {str(e)}")
        raise FileConversionError(f"Failed to convert text file: {str(e)}")


def convert_file_to_numpy(filename: str, file_content: bytes) -> Dict[str, Any]:
    """
    Main function to convert uploaded file to numpy array
    """
    logger.info(f"=== Starting file conversion process for: {filename} ===")
    file_size = len(file_content)
    
    # Validate file
    validate_file(filename, file_size)
    
    ext = get_file_extension(filename)
    
    # Convert based on file type
    if ext in ALLOWED_IMAGE_FORMATS:
        logger.info(f"Processing as image file")
        return image_to_numpy(file_content, filename)
    elif ext in ALLOWED_TEXT_FORMATS:
        logger.info(f"Processing as text file")
        return text_to_numpy(file_content, filename)
    else:
        raise FileConversionError(f"Unsupported file format: .{ext}")
