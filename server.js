
//requires express module
const express = require('express');
const fs = require('fs');
const path = require('path');
// instantiate the server
const app =express();

//port 
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

app.get('/notes', (req,res)=>{
  res.sendFile(path.join(__dirname, '/public/notes.html' ));
});

app.get('/api/notes', (req, res)=>{
  res.sendFile(path.join(__dirname, 'db/db/json'));
});



app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
  
// receive new note to save 
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let notelength = (noteList.length).toString();

  //create new property called id based on length and assign it to each json object
  newNote.id = notelength;
  //push updated note to the data containing notes history in db.json
  noteList.push(newNote);

  //write the updated data to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
})

//delete note according to their  id.
app.delete("/api/notes/:id", (req, res) => {
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteId = (req.params.id).toString();

  //filter all notes that does not have matching id and saved them as a new array
  
  noteList = noteList.filter(selected =>{
      return selected.id != noteId;
  })

  //write the updated data to db.json and display the updated note
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});


//listen tot he port when deployed
app.listen(PORT, () => console.log("Server listening on port " + PORT));