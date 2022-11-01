const Job = require("../models/Job");
//create information
exports.saveJob = async (req, res, next) => {
    const newJob = new Job(req.body);
    try {
        const savedJob = await newJob.save();
        res.status(200).json(savedJob);
    } catch (error) {
        next(error);
    }
};

//get all information
exports.getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
};
//get a job information
exports.getAJob = async (req, res, next) => {
    const id = req.params.id;
    try {
        const job = await Job.findById(id);
        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
};

//get a job information
exports.getAJobWithInfo = async (req, res, next) => {
    const id = req.params.id;
    try {
        const job = await Job.findById(id).populate(
            "hiringManagerId",
            "email contactNumber role -_id"
        );
        res.status(200).json(job);
    } catch (error) {
        next(error);
    }
};
//update information
exports.updateJob = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedJob);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.deleteDemo = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Demo.findByIdAndDelete({ _id: id });
        res.status(200).json({ msg: "Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

//=========================================================== //
//=============FILE UPLOAD START=========================//
exports.fileUpload = async (req, res) => {
    try {
        res.status(200).json(req.file);
    } catch (error) {}
};
//=============FILE UPLOAD END=========================//
