const {Router} = require("express");
const { v4: uuid} = require("uuid")

const router= Router()

const notes = []

router.get("/notes/:id", (req,res) => {
    const noteId = req.params.id;
    const note = notes.find(note => noteId === noteId);
    res.json(note)
});

router.get("/api", (req,res) => res.json(notes));

module.exports = router;