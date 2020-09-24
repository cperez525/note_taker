const fs = require("fs");
const uniqueid = require("uniquid");
const express = require("express");
const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

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

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT)
});
