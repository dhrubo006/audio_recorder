from fastapi import WebSocket, WebSocketDisconnect

# WebSocket endpoint for streaming audio
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
