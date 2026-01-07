# FastAPI Backend Service

A FastAPI-based backend service for the Vibe Coding project.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Setup Instructions

### 1. Create and Activate Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
python -m venv venv
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
python -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

With the virtual environment activated, install all required packages:

```bash
pip install -r requirements.txt
```

### 3. Run the Development Server

Start the FastAPI server:

```bash
python main.py
```

The API will be available at `http://localhost:8000`

### 4. Access API Documentation

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── main.py              # Application entry point
├── requirements.txt     # Python dependencies
├── app/
│   └── __init__.py      # FastAPI app instance and middleware configuration
└── README.md            # This file
```

## Development Workflow

1. Ensure virtual environment is activated (you should see `(venv)` in your terminal)
2. Make changes to your Python code
3. The server may need to be restarted for changes to take effect (or use `--reload` flag)
4. For auto-reload during development, run:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## CORS Configuration

The application is configured to accept requests from:
- `http://localhost:5173` (Vite default dev server)
- `http://localhost:3000` (alternative port)
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`

Modify the `origins` list in `main.py` if your frontend runs on a different port.

## Adding New Dependencies

When you need to add new packages:

1. With virtual environment activated, install the package:
   ```bash
   pip install package-name
   ```

2. Update `requirements.txt`:
   ```bash
   pip freeze > requirements.txt
   ```

## Deactivating Virtual Environment

When done working:

```bash
deactivate
```

## Troubleshooting

**Issue**: `python: command not found` on macOS/Linux
- Use `python3` instead of `python`, or set up an alias

**Issue**: Virtual environment not activating
- Ensure you're in the `backend` directory
- Check that Python is installed and accessible

**Issue**: Port 8000 already in use
- Run on a different port: `uvicorn main:app --port 8001`

## Endpoints

- `GET /` - Root endpoint (health check)
- `GET /api/health` - Health check endpoint

## Next Steps

1. Expand the `app/` module with organized route files
2. Add database models and connections as needed
3. Implement authentication/authorization
4. Add request validation using Pydantic models
