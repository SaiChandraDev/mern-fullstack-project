import express from "express"
import { createNote, getNoteBySpecificId, deleteNote, getAllNotes, updateNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getAllNotes)

router.get("/:id", getNoteBySpecificId)

router.post("/", createNote)

router.put("/:id", updateNote)

router.delete("/:id", deleteNote)

export default router;