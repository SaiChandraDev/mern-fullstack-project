import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001

app.use(cors({
    origin: "http://localhost:5173",
}))
//middle-ware, Where this express function helps us in defining the req body in the controller js.
app.use(express.json());

//We are calling this just before we send our response back to the client.
app.use(rateLimiter);


app.use("/api/notes", notesRoute);

//Connect the DB first then starting the app.(i.e) Application.
connectDB().then(()=> {
app.listen(PORT, ()=> {
    console.log("Server started on PORT:", PORT);
});
});

