import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
        },
        artist: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        artwork: {
            type: String,
            required: true,
        },
        genre: {
            type: Array,
            required: false
        },
        singles: {
            type: Array,
            required: false
        }
    }, 
    {
        timestamps: true
    }
)


const Album = mongoose.model("Album", albumSchema);
export default Album;