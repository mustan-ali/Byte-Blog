const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()


const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json("User not found");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("Wrong password");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const { password, ...info } = user._doc;

        return res.cookie("token", token).status(200).json(info);
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json("Logged out successfully");
    }
    catch (error) {
        res.status(500).json(error);
    }
}


const verifyUser = async (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.status(200).json(data);
    });
}


module.exports = { registerUser, loginUser, logoutUser, verifyUser };