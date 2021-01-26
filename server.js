// These are the dependencies
const express = require("express");
const fs = require("fs")
const path = require("path");
// var jsonFile = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");
var note = []

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
  if (err) throw err;
  console.log(data);
  note = JSON.parse(data);
});
// Api:
app.get("/api/notes", function(req, res) {
    res.json(note)
  });

function writeNote(note) {
    fs.writeFile("./db/db.json", JSON.stringify(note), (err) => {
   if (err) throw err; 
   return true
  });
  }
  //POST & object for note id 
  app.post("/api/notes", function(req, res) {
    var noteId = uuidv4();
    var newNote = {
        id: noteId, 
        title: req.body.title,
        text: req.body.text
    }
    
        note.push(newNote);
        writeNote(note);
        res.send(newNote) 
    
  });
//Delete notes:
app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);
    
        // var notes = JSON.parse(data);
        // var filterNotes = notes.filter(note => note.id != noteId);
        note.splice(noteId, 1);

        fs.writeFile("db/db.json", JSON.stringify(note, "\t"), (err) => {
          if (err) throw err;
          return true;
        });
    
 
  });
 
  // Listener
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});