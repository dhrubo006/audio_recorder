from fastapi import Request



# Get notes
async def get_notes():
    notes = "These are some example notes about the audio."
    return {"notes": notes}

# Save notes
async def save_notes(request: Request):
    data = await request.json()
    notes = data.get("notes")
    # Save the notes to a database or file (example logic)
    print(f"Saving notes: {notes}")
    return {"message": "Notes saved successfully"}



# Delete notes
async def delete_notes():
    # Delete the notes from a database or file (example logic)
    print("Notes deleted")
    return {"message": "Notes deleted successfully"}
