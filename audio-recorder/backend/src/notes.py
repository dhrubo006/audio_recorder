from fastapi import Request



# Get notes
async def get_notes():
    notes = "These are some example notes about the audio."
    return {"notes": notes}

# Save notes
async def save_notes(request: Request):
    data = await request.json()
    notes = data.get("notes")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    full_name = data.get("full_name")
    # Save the notes to a database or file (example logic)
    print(f"Saving notes: {notes}")
    print(f"Saving first name: {first_name}")
    print(f"Saving last name: {last_name}")
    print(f"Saving full name: {full_name}")
    return {"message": "Notes saved successfully"}



# Delete notes
async def delete_notes():
    # Delete the notes from a database or file (example logic)
    print("Notes deleted")
    return {"message": "Notes deleted successfully"}
