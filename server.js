// These are the dependencies
const express = require("express");
const fs = require("fs")
const path = require("path");
var jsonFile = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

const app = express();
//Initial Port
const PORT = process.env.PORT || 3000; 
// Sets up Express app to handle body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Static files and resources
app.use(express.static("public"));

// HTML routes:
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


//ReadFile
fs.readFile('./db/db.json',  "utf-8", (err, data) => {
  note = JSON.parse(data);
  if (err) throw err;
  console.log(data);
});
// Api:
app.get("/api/notes", function(req, res) {
    res.json(note)
  });

function writeNote(note) {
    fs.writeFile("./db/db.json", JSON.stringify(note), (err) =>
  err ? console.error(err) : console.log('Success!')
  );
  }
  //POST
  app.post("/api/notes", function(req, res) {
    var noteId = uuidv4();
    var newNote = {
        id: noteId, 
        title: req.body.title,
        text: req.body.text
    }
    fs.readFile("./db/db.json", "utf-8", (err, data) =>{
        note.push(newNote);
        writeNote(note);
        res.send(newNote) 
    })
  });
//Delete notes:
app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        var filterNotes = notes.filter(note => note.id != noteId);
        
        fs.writeFile("./db/db.json", JSON.stringify(filterNotes, null, 2), err =>{
            if (err) throw err;
            res.send();
        })
    })
 
  });
 
  // Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});