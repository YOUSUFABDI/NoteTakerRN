from flask import Blueprint, jsonify, request
from app.models.note import make_note, delete_note_by_id, get_note, update_note_by_id, get_all_notes

note_bp = Blueprint('note', __name__)

@note_bp.route('/create_note', methods=["POST"])
def create_note():
    title = request.json.get('title')
    description = request.json.get('description')
    created_dt = request.json.get("created_dt")
    user_id = request.json.get("user_id")

    # Create new note
    note_id = make_note(title, description, created_dt, user_id)

    return jsonify({"message": "created successfully", "note_id": note_id}), 201


@note_bp.route('/get_notes', methods=['POST'])
def get_notes():
    # Get all notes
    username = request.json.get('username')
    notes = get_all_notes(username)

    # Check if there are notes
    if not notes:
        return jsonify({"message": "No notes found", "status": "error"}), 404
    
    return jsonify({"message": notes, "status": "success", "length": len(notes)}), 200

@note_bp.route('/delete_note/<int:note_id>', methods=["DELETE"])
def delete_note(note_id):
    # Delete the note by id
    success = delete_note_by_id(note_id)

    if success:
        return jsonify({"message": f"Note {note_id} deleted successfully", "status": 'success'}), 200
    else:
        return jsonify({"message": f"Note {note_id} not found", "status": "error"}), 404
    
@note_bp.route('/update_note/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    # Get the existing note
    existing_note = get_note(note_id)

    if not existing_note:
        return jsonify({"error": "Note not found"}), 404
    
    # Get the updated details from the request
    updated_title = request.json.get('title', existing_note['title'])
    updated_description = request.json.get('description', existing_note['description'])
    updated_dt = request.json.get('updated_dt', existing_note['updatedDT'])

    # Update the note
    success = update_note_by_id(note_id, updated_title, updated_description, updated_dt)

    if success:
        return jsonify({"message": "Note updated successfully"}), 200
    else:
        return jsonify({"error": "Failed to update note"}), 500