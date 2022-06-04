const mongoose = require("mongoose");

const RequestModel = mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

    for: {
        type: String,
        required: true
    }

});

const Request = mongoose.model('Request', RequestModel);
module.exports = Request;