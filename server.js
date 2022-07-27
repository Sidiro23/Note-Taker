
//requires express module
const express = require('express');
const fs = require('fs');
const path = require('path');
// instantiate the server
const app =express();

//port 
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended : true}));
app.use(express.static('public'));
app.use(express.json());

app.post('/api/notes', (req, res)=>{
  fs.readFile('./db/db.json', 'utf8', (err, data)=>{
    if (err) throw err;
    let notes= JSON.parse(data);
    let userNote = req.body;
    userNote.id = Math.floor(math.random()* 5000);
    notes.push(userNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err,data)=>{
      res.json(userNote);
    });
  });
});

app.get('api/notes/:id', (req,res)=>{
  res.json(notes[req.params.id]);
});
app.get('api/notes', (req, res)=>{
  fs.readFile('./db/db.json', 'utf8', (err, data) =>{
    if (err) throw err;
    let notes = JSON.parse(data);
    res.json(notes);
  });
});