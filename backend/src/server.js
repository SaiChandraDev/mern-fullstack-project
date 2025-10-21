import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";


import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001
const __dirname = path.resolve();
//can be used in development to resolve cors error between client and server not encountered any errors after deployment to production.
if (process.env.NODE_ENV !== "production") {
app.use(cors({
    origin: "http://localhost:5173",
}))
}
//middle-ware, Where this express function helps us in defining the req body in the controller js.
app.use(express.json());

//We are calling this just before we send our response back to the client.
app.use(rateLimiter);


app.use("/api/notes", notesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//Connect the DB first then starting the app.(i.e) Application.
connectDB().then(()=> {
app.listen(PORT, ()=> {
    console.log("Server started on PORT:", PORT);
});
});

