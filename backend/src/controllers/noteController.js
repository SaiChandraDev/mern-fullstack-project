import Note from "../models/Notes.js"

export async function getAllNotes(_,res) { //I defined the first unused parameter to the standard convention "_"
    try {
    const notes = await Note.find().sort({createdAt: -1}); // Fetch newest first. (i.e) in desc order of the notes.
    res.status(200).json(notes)
    }
    catch(error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteBySpecificId(req, res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({Message: "Note not found"})
        res.status(200).json(note)
    } catch (error) {
        console.error("Error in getSpecific notes from controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req,res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const savedNote = await note.save();
        res.status(201).json(savedNote)
    }
    catch(error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req,res) {
     try {
    const {title, content} = req.body;
    const updatedContent = await Note.findByIdAndUpdate
    (req.params.id, 
    {title,content}, 
    {new: true}
    );
    if(!updatedContent) return res.status(404).json({message: "Duplicate id"});
    res.status(200).json(updatedContent);    
}
catch (error) {
    console.error("Error in updatingTheNotes", error);
        res.status(500).json({ message: "Internal server error" });
}
}

export async function deleteNote(req, res) {
    try {
    const deletedNote =  await Note.findByIdAndDelete(req.params.id,{
    new : true   
    });
    if(!deletedNote) return res.status(404).json({message: "Duplicate id"});
    res.status(200).json(deletedNote);
    res.status(200).json({message: "Notes deleted successfully"});    
}

catch (error) {
    console.error("Error in deleting The Notes", error);
        res.status(500).json({ message: "Internal server error" });
}
}