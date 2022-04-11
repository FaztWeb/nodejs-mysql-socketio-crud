import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "./models/notes.js";

export default (io) => {
  io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("nuevo socket connectado:", socket.id);

    // Send all messages to the client
    const emitNotes = async () => {
      const notes = await getNotes();
      socket.emit("server:loadnotes", notes);
    };
    emitNotes();

    socket.on("client:newnote", async (data) => {
      const result = await createNote(data);
      io.emit("server:newnote", { ...data, id: result.insertId });
    });

    socket.on("client:deletenote", async (noteId) => {
      await deleteNote(noteId);
      emitNotes();
    });

    socket.on("client:getnote", async (noteId) => {
      const note = await getNote(noteId);
      socket.emit("server:selectednote", note);
    });

    socket.on("client:updatenote", async (updatedNote) => {
      await updateNote(
        updatedNote.id,
        updatedNote.title,
        updatedNote.description
      );
      emitNotes();
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
