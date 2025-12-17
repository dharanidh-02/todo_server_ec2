import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./Db/db.js";
import route from "./Routes/todoRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Error handling middleware for JSON parsing
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON format. Please check your request body.' });
    }
    next();
});

//http://localhost:5000/csbs 
//What are the apis are created it wil be opened after the csbs
app.use('/csbs', route);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

connectDb();
