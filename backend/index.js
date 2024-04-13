const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const PORT = process.env.PORT;
const authRoute = require('./routes/auth');

app.use(express.json());
app.use(authRoute);

const ConnectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    }
    catch (error) {
        console.log("Error connecting to database: ", error);
    }
}

app.listen(PORT, () => {
    ConnectDatabase();
    console.log(`Server is running on port ${PORT}`);
});