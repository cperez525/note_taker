const fs = require("fs")
const uniqueid = require("uniquid")
const express = require("express");
const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"))

let path = require("path");
const { notEqual } = require("assert");
const { json } = require("express");

app.get("/notes", function (req, res) {

    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", function(req,res) {

    res.sendFile(path.join(__dirname, "/db/db.json"))

})

app.get("*", function (req, res) {

    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.post("/api/notes", function(req, res){

    let createNote = req.body
    createNote.id = uniqueid()

    fs.readFile(path.join(__dirname,"/db/db.json"), function (err, data){

        if (err) throw err;

        let savedNotes = JSON.parse(data)
        savedNotes.push(createNote)

        fs.appendFile(path.join(__dirname,"/db/db.json"), JSON.stringify(savedNotes), function(err) {

            if (err) throw err;

            console.log("it worked")
        })

        console.log(savedNotes)
        return res.json(savedNotes)
    })

})

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
})
