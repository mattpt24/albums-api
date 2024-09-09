import express from "express";
const app = express.Router();
import Album from "../models/Album.model.js";





// GET ALL ALBUMS

app.get("/", async (req, res) => {
    try {
        const allAlbums = await Album.find({});
        res.json(allAlbums);
    }
    catch(err) {
        res.json({message : err.message});
    }
})





  // FILTERATION BY GENRE / ARTIST / YEAR

  app.get("/filter", async (req, res) => {
    try {
      const matchedAlbum = await Album.find(req.query);
      if(matchedAlbum.length === 0) {
        res.status(400).json({error : "No match to your query"});
      }
      else {
        res.status(200).json(matchedAlbum);
      }
    } 
    catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });





// ADD ALBUM 

app.post("/", async (req, res) => {
    try {
        const newAlbum = await Album.create(req.body);
        res.json(newAlbum);
        console.log(`Successfully added ${req.body.name} to Album Database!`);
    }
    catch(err) {
        res.json({message : err.message});
    }
})




// GET RANDOM ALBUM

app.get("/random", async (req, res) => {
    try {
        const allAlbums = await Album.find({});
        const randomNumber = Math.floor(Math.random() * allAlbums.length);
        const randomAlbum = allAlbums[randomNumber];
        res.json(randomAlbum);
    }
    catch(err) {
        res.json({message : err.message});
    }
  })





// GET SPECIFIC SONG BY ID

app.get("/:id", async (req, res) => {
    try {
        const requestedID = req.params.id;
        const songWithMatchingID = await Album.find({_id : requestedID});
        res.json(songWithMatchingID);
    }
    catch(err) {
        res.json({message : err.message});
    }
});





  // UPDATE SONG

  app.put("/:id", async (req, res) => {    
    try {
      const matchedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
      console.log("Successfully updated album!");
      if (!matchedAlbum) {
        return res.status(404).json({ message: "Album not found" });
      }
      
      res.json(matchedAlbum);
    } catch (err) {
      res.json({ message: err.message });
    }
  });





// DELETE ALBUM

app.delete("/:id", async (req, res) => {
    try {
        const requestedID = req.params.id
        const albumWithMatchedID = await Album.findOneAndDelete({_id: requestedID});
        res.json({success : `Successfully deleted ${albumWithMatchedID.name} from Album Database!`})
    }
    catch(err) {
        res.json({message : err.message});
    }
})




export default app;