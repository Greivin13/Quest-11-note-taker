const { Router } = require("express");
const path = require("path");

const router = Router(); 

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

/*router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});*/ //Was giving me 'Uncaught (in promise) SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON <!DOCTYPE html>' err
//after commenting out it worked just fine

module.exports = router;
