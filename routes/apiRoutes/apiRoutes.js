const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const router = Router();

const dbFilePath = path.join(__dirname, "../../db/db.json"); 

// GET route to retrieve all notes
router.get("/notes", (req, res) => {
    try {
        const data = fs.readFileSync(dbFilePath, "utf8");
        const notes = JSON.parse(data);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new note
router.post("/notes", (req, res) => {
    const { title, text } = req.body;
    try {
        const data = fs.readFileSync(dbFilePath, "utf8");
        const notes = JSON.parse(data);
        const newNote = { id: uuid(), title, text }; // Generate a unique ID for the new note
        notes.push(newNote);
        fs.writeFileSync(dbFilePath, JSON.stringify(notes, null, 2), "utf8");
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: "Bad request" });
    }
});

// DELETE route to delete a note by ID
router.delete("/notes/:id", (req, res) => {
    const noteId = req.params.id;
    
    // Read the existing notes from the db.json file
    fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        let notes = JSON.parse(data);

        // Find the index of the note with the matching ID
        const noteIndex = notes.findIndex(note => note.id === noteId);

        if (noteIndex === -1) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Remove the note from the array
        notes.splice(noteIndex, 1);

        // Write the updated notes back to the db.json file
        fs.writeFile(path.join(__dirname, "../../db/db.json"), JSON.stringify(notes), "utf8", err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }

            return res.json({ message: "Note deleted successfully" });
        });
    });
});

module.exports = router;



module.exports = router;
