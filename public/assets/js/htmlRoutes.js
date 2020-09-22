const express = require("express")
const app = express()

let path = require("path")

app.get("/notes", function(req, res) {

    res.sendFile(path, join(__dirname, "../../../notes.html"))
})

app.get("*", function(req, res) {

    res.sendFile(path, join(__dirname, "../../../index.html"))
})