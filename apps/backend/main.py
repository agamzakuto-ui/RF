from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
