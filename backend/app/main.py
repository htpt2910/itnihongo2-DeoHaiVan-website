from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from datetime import datetime

app = FastAPI(openapi_url="/openapi.json", docs_url="/documentation")

origins = [
  "http://localhost:3001",
  "http://localhost:3000",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
async def main():
  return "Hello"

@app.get("/day", tags=["Dates"])
def get_day_of_week():
    """
    Get the current day of week
    """
    return datetime.now().strftime("%A")
