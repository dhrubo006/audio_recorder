from fastapi import FastAPI, File, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import os
from datetime import datetime
import uvicorn

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


# New endpoint to get notes
@app.get("/get-notes/")
async def get_notes():
    notes = "These are some example notes about the audio."
    return {"notes": notes}


# New endpoint to get transcription
@app.get("/get-transcription/")
async def get_transcription():
    transcription = "This is a dummy transcription of the audio."
    return {"transcription": transcription}


# WebSocket endpoint for streaming audio (optional, as it was previously used)
@app.websocket("/audio-stream")
async def audio_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_bytes()
            print("Received audio chunk:", data)

    except WebSocketDisconnect:
        print("WebSocket connection closed: Client disconnected.")
    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        await websocket.close()


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
