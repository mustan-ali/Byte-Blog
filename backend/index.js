const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config()
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT;
const FrontendURL = process.env.FRONTEND_URL;
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');

app.use(cors({ origin: { FrontendURL }, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)


const ConnectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    }
    catch (error) {
        console.log("Error connecting to database: ", error);
    }
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, "images");

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.img)
    }
})


const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})


app.listen(PORT, () => {
    ConnectDatabase();
    console.log(`Server is running on port ${PORT}`);
});