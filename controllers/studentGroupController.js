const StudentGroup = require("../models/studentGroupModel");

const createStudentGroup = async(req, res) => {

    if(req.body){
        const studentGroupDetails = {
            students: req.body.students,
            topic: '',
            supervisor: null,
            co_supervisor: null,
            attachments: [],
            panel: []
        };

        const studentGroup = new StudentGroup(studentGroupDetails);
        
        await studentGroup.save()
        .then( data => {
            res.status(201).send({ success: true, 'message': "Student Group Created Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

const getStudentGroupByID = async(req, res) => {

    if(req.params && req.params.id){
        
        await StudentGroup.findById(req.params.id).populate("students").populate("supervisor").populate("co_supervisor")
        .populate("attachments").populate("panel")
        .then( data => {
            res.status(200).send({ success: true, 'studentGroup': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "Id Not Found" })
    }
}

const registerTopic = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            topic: req.body.topic,
            supervisor: null,
            co_supervisor: null,
            attachments: [],
            panel: []
         };
        
        await StudentGroup.updateOne( query , update)
        .then( result => {
            res.status(200).send({ success: true, 'message': "Research Topic Registered Successfully!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

const supervisorApproves = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            supervisor: req.body.supervisor,
         };
        
        await StudentGroup.updateOne( query , update)
        .then( result => {
            res.status(200).send({ success: true, 'message': "Supervisor has Approved!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

const co_supervisorApproves = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            co_supervisor: req.body.co_supervisor,
         };
        
        await StudentGroup.updateOne( query , update)
        .then( result => {
            res.status(200).send({ success: true, 'message': "Co-Supervisor has Approved!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

const panelApproves = async(req, res) => {

    if(req.body && req.params){

        const query = { "_id": req.params.id };
        const update = { 
            panel: req.body.panel,
         };
        
        await StudentGroup.updateOne( query , update)
        .then( result => {
            res.status(200).send({ success: true, 'message': "Panel has Approved!" })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )

    }else{
        res.status(200).send({ success: false, 'message': "No Data Found" })
    }
}

const getStudentGroupByUserID = async(req, res) => {

    if(req.params && req.params.id){
        await StudentGroup.find({ "students": req.params.id }).populate("students").populate("supervisor").populate("co_supervisor")
        .populate("attachments").populate("panel")
        .then( data => {
            res.status(200).send({ success: true, 'studentGroup': data })
        })
        .catch( (error) => {
            res.status(500).send({ success: false, 'message': error })
        } )
    }
    else{
        res.status(200).send({ success: false, 'message': "No data found" })
    }

}

module.exports = { createStudentGroup, getStudentGroupByID, registerTopic, supervisorApproves, co_supervisorApproves, 
                   panelApproves, getStudentGroupByUserID };