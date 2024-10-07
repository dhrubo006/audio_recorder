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


# WebSocket endpoint for streaming audio
@app.websocket("/audio-stream")
async def audio_stream(websocket: WebSocket):
    
    '''DOC: it recieves the audio data from the front end and prints the data in binary format to the terminal.
      when the front end stops sending data it prints Websocket connection closed'''
    
    await websocket.accept()
    try:
        while True:
            # Receive binary data from the client
            data = await websocket.receive_bytes()

            # Print the audio data in binary format to the terminal
            print("Received audio chunk:", data)

    except WebSocketDisconnect:
        print("WebSocket connection closed: Client disconnected.")
    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        await websocket.close()


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
