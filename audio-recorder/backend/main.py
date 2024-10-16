from fastapi import FastAPI, UploadFile, File, Request, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import os
from datetime import datetime
import uvicorn

# Importing the modules from src folder
from src.audioStreamin import audio_stream
from src.notes import get_notes, save_notes, delete_notes
from src.transcriptions import get_transcription

app = FastAPI()

# Allow CORS for your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# Notes-related endpoints
@app.get("/get-notes/")
async def handle_get_notes():
    return await get_notes()


@app.post("/save-notes")
async def handle_save_notes(request: Request):
    return await save_notes(request)


@app.delete("/delete-notes")
async def handle_delete_notes():
    return await delete_notes()


# Transcription-related endpoints
@app.get("/get-transcription/")
async def handle_get_transcription():
    return await get_transcription()


# WebSocket for audio streaming
@app.websocket("/audio-stream")
async def handle_audio_stream(websocket: WebSocket):
    await audio_stream(websocket)


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
