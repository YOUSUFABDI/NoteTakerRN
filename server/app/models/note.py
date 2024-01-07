from app import app

def make_note(title, description, created_dt, user_id):
     cursor = app.config['MYSQL_CONNECTION'].cursor()
     cursor.execute("INSERT INTO notes (title, description, createdDT, user_id) VALUES(%s, %s, %s, %s)", (title, description, created_dt, user_id))
     app.config['MYSQL_CONNECTION'].commit()
     note_id = cursor.lastrowid
     cursor.close()
     return note_id

def get_all_notes(id):
     cursor = app.config['MYSQL_CONNECTION'].cursor(dictionary=True)
     cursor.execute("SELECT * FROM notes WHERE user_id = %s", (id,))
     notes = cursor.fetchall()
     cursor.close()
     return notes

def get_note(note_id):
     cursor = app.config['MYSQL_CONNECTION'].cursor(dictionary=True)
     cursor.execute('SELECT * FROM notes WHERE id = %s', (note_id,))
     note = cursor.fetchone()
     cursor.close()
     return note

def update_note_by_id(note_id, updated_title, updated_description, updated_dt):
    cursor = app.config['MYSQL_CONNECTION'].cursor()

    update_query = "UPDATE notes SET title = %s, description = %s, updatedDT = %s WHERE id = %s"
    update_values = (updated_title, updated_description, updated_dt, note_id)

    cursor.execute(update_query, update_values)
    app.config['MYSQL_CONNECTION'].commit()
    cursor.close()

    return True


def delete_note_by_id(note_id):
     cursor = app.config['MYSQL_CONNECTION'].cursor()
     cursor.execute("DELETE FROM notes WHERE id = %s", (note_id,))
     app.config['MYSQL_CONNECTION'].commit()
     success = cursor.rowcount > 0
     cursor.close()
     return success