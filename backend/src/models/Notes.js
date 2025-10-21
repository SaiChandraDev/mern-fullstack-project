import mongoose from "mongoose"

//1 - create a schema 
//2 - we will create the model of the schema

const notesSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
    },
},
    {timestamps: true} //Created At Updated At.
);

const Note = mongoose.model("Note", notesSchema)

export default Note;