import express from "express";
import cors from "cors";
const app = express();
const port = 3200;

import mongoose from "mongoose";
import bodyParser from "body-parser";
import albumRouter from "./routes/albums.js";


// USED FOR SENDING STATIC FILES (HTML / JSON)
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));





// DB CONNECTION
mongoose.connect("mongodb+srv://mattypt:albumapipassword@albumdb.4mmqm.mongodb.net/?retryWrites=true&w=majority&appName=AlbumDB")
.then(() => console.log("Successfully connected to Music Albums Database"))
.catch(() => console.log("Error connecting to Music Album Database"));



// BODY PARSING
app.use(bodyParser.urlencoded({ extended : true }));


app.use(cors());


// USE PUBLIC AS BASE FOLDER TO STATIC FILES
app.use(express.static("public"));


// ALBUM ENDPOINT REQUESTS
app.use("/albums", albumRouter);


// BROWSER API HOME PAGE 

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname + "/public/index.html");
  }
  catch(err) {
    res.json({message : err.message});
  }
})





app.listen(port, () => {
    console.log(`Running on Port ${port}`);
})