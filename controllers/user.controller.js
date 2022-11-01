const Apply = require("../models/Apply");
const User = require("../models/User");
const { createError } = require("../Utilities/error");

//get all Hiring Manager
exports.getAllHiringManagers = async (req, res, next) => {
    try {
        const hiringManagers = await User.find({ role: "Hiring-Manager" });
        res.status(200).json(hiringManagers);
    } catch (error) {
        next(error);
    }
};

//get all Candidate
exports.getAllCandidates = async (req, res, next) => {
    try {
        const candidates = await User.find({ role: "Candidate" });
        res.status(200).json(candidates);
    } catch (error) {
        next(error);
    }
};
//get a Candidate
exports.getACandidate = async (req, res, next) => {
    const id = req.params.id;
    try {
        const candidate = await User.findOne({
            _id: id,
            role: "Candidate",
        }).populate(
            "jobId",
            "-_id jobTitle employmentType organizationName jobDescription qualification experience salary jobLocation "
        );
        if (candidate) {
            res.status(200).json(candidate);
        } else {
            return next(createError(404, "Candidate not found"));
        }
    } catch (error) {
        next(error);
    }
};
