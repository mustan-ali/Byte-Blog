const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/tokenVerification');


//Get User
router.get('/:id', userController.getUser);

//Update User
router.put('/:id', verifyToken, userController.updateUser);

//Delete User
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;