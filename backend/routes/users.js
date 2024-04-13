const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//Get User
router.get('/:id', userController.getUser);

//Update User
router.put('/:id', userController.updateUser);

//Delete User
router.delete('/:id', userController.deleteUser);

module.exports = router;