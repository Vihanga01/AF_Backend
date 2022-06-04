const mongoose = require("mongoose");

const StudentGroupModel = mongoose.Schema({

    students: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:'User'
    }],

    topic: {
        type: String,
        required: false
    },

    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:'User'
    },

    co_supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },

    attachments:[{
        type: String,
        required: false,
    }],

    panel: [{
        type: mongoose.Schema.Types.ObjectId,
        retuired: false,
        ref: 'User'
    }]
        
});

const StudentGroup = mongoose.model('StudentGroup', StudentGroupModel);
module.exports = StudentGroup;