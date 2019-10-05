import express from "express";

let app = express();

let hostname = "localhost";
let port = 3299;

app.get("/hello", (req, res) => {
    res.send("<h1>From server with love!!!</h1>")
});

app.listen(port, hostname, () => {
    console.log(`Server is running at ${hostname} on ${port}!`);
});