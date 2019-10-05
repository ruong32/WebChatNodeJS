import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model"

let app = express();

ConnectDB();

let hostname = "localhost";
let port = 3299;

app.get("/hello", async (req, res) => {
    try {
        let item = {
            userId: "17020996",
            contactId: "321999"
        };
        let contact = await ContactModel.createNew(item)
    } catch (error) {
        console.log(error)
    }
    res.send("<h1>From server with love!!!</h1>")
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`Server is running at ${process.env.APP_HOST} on ${process.env.APP_PORT}!`);
});
