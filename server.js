// These are the dependencies
const express = require("express");
const fs = require("fs")
const path = require("path");
var jsonFile = require("./db/db.json");
// const apiRoutes = require("./routes/apiRoutes")
// const htmlRoutes = require("./routes/htmlRoutes")

const app = express();
//Initial Port
const PORT = process.env.PORT || 3000; 
// Sets up Express app to handle body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Static files and resources
app.use(express.static("public"));

// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);



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
    var newNote = req.body;
    note.push(newNote);
    writeNote(note);
    res.send()
  });

  //Display saved notes:



//Delete notes:
// app.delete("/api/notes/:id", function (req, res) {
//     notes.splice(req.params.id, 1);
//     updatedNote();
//     console.log("note with id " + req.params.id);
//   });

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});