import { getConnection } from "../db.js";

export const createNote = async (newNote) => {
  const conn = await getConnection();
  const result = await conn.query(
    `INSERT INTO notes (title, description) VALUES (?, ?)`,
    [newNote.title, newNote.description]
  );
  return result[0];
};

export const getNotes = async () => {
  const conn = await getConnection();
  const [result] = await conn.query(`SELECT * FROM notes`);
  return result;
};

/**
 * Delete a note
 * @param {number} id the id of the note to be deleted
 */
export const deleteNote = async (id) => {
  const conn = await getConnection();
  const result = await conn.query(`DELETE FROM notes WHERE id = ?`, [id]);
  return result;
};

/**
 * find a note by id
 * @param {number} id
 * @returns a note object
 */
export const getNote = async (id) => {
  const conn = await getConnection();
  const [result] = await conn.query(`SELECT * FROM notes WHERE id = ?`, [id]);
  return result[0];
};

export const updateNote = async (id, title, description) => {
  const conn = await getConnection();
  const result = await conn.query(
    `UPDATE notes SET title = ?, description = ? WHERE id = ?`,
    [title, description, id]
  );
  return result;
}
