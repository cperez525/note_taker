const express = require("express");
var app = express();

let PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./public/assets/js/apiRoutes");
require("./public/assets/js/htmlRoutes");
require("./public/assets/js/index")

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});