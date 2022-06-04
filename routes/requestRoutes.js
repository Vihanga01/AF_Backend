const express = require("express");
const {createRequest, deleteRequest, getRequestsByUserID} = require('../controllers/requestController');

const router = express.Router();

router.route('/').post(createRequest)

router.route('/:id').delete(deleteRequest)

router.route('/user/:id').get(getRequestsByUserID)

module.exports = router