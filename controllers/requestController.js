const Request = require("../models/requestModel");

const createRequest = async(req, res) => {
    if(req.body){
        const requestDetails = {
            sender: req.body.sender,
            recipient: req.body.recipient,
            for: req.body.for
        };

        const request = new Request(requestDetails);
        
        await request.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Request Created Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

const deleteRequest = async(req, res) => {

    if(req.params && req.params.id){
        
        await Request.deleteOne( {"_id":req.params.id} )
        .then( result => {
            res.status(200).send({ success: true, 'message': "Request Deleted Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }else{
        res.status(200).send({ success: false, 'message': "No Id Found" })
    }
}

const getRequestsByUserID = async(req, res) => {

    if(req.params && req.params.id){
        await Request.find({ "recipient": req.params.id }).populate("sender").populate("recipient")
        .then( data => {
            res.status(200).send({ success: true, 'requests': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "No data found" })
    }

}

module.exports = {createRequest, deleteRequest, getRequestsByUserID};