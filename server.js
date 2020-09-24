// Dependencies 
const fs = require("fs");
const uniqueid = require("uniquid");
const express = require("express");
const app = express();

// Setting up PORT to work with Heroku or use port 3000
let PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Bringing in path and setting up HTTP GET request listeners
let path = require("path");

app.get("/notes", function (req, res) {

    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("/api/notes", function(req,res) {

    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.get("*", function (req, res) {

    res.sendFile(path.join(__dirname, "/public/index.html"))
});

// HTTP Post request listener that assigns id to saved notes, creates an array for saved notes, and overwrites db.json file with updated array, then returns updated array
app.post("/api/notes", function(req, res){

    let createNote = req.body;
    createNote.id = uniqueid();

    fs.readFile(path.join(__dirname, "/db/db.json"), function (err, data){

        if(err) throw err;

        let savedNotes = JSON.parse(data);
        savedNotes.push(createNote);

        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(savedNotes), function(err) {

            if(err) throw err;
        });

        return res.json(savedNotes)
    });
});

// Updates savedNotes array with existing objects whose IDs do not match the ID in the Request parameter
app.delete("/api/notes/:id", function(req, res) {

    fs.readFile(path.join(__dirname, "/db/db.json"), function(err, data) {

        if(err) throw err;

        let savedNotes = JSON.parse(data);
        alteredSavedNotes = savedNotes.filter(savedNotes => savedNotes.id !== req.params.id);

        fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(alteredSavedNotes), function(err) {

            if(err) throw err;
        });

        return res.json(alteredSavedNotes)
    });
});

// Setting up listener on server
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT)
});
