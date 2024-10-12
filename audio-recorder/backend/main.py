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

# Create a folder to store uploaded audio files
UPLOAD_DIRECTORY = "./uploaded_audio"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)


# Endpoint for uploading audio files
@app.post("/upload-audio/")
async def upload_audio(file: UploadFile = File(...)):
    try:
        # Save the audio file with a timestamp to avoid overwriting
        file_location = os.path.join(
            UPLOAD_DIRECTORY,
            f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}",
        )

        # Save the audio file
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())

        return {"message": "Audio uploaded successfully", "file_path": file_location}
    except Exception as e:
        return {"message": f"Failed to upload audio: {str(e)}"}


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
