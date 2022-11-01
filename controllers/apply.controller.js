const Apply = require("../models/Apply");
const User = require("../models/User");
const { createError } = require("../Utilities/error");
//job apply
exports.saveApply = async (req, res, next) => {
    const userId = req.body.user.id;
    const jobId = req.body.jobInfo.jobId;
    const newApply = new Apply(req.body);
    try {
        const isExist = await Apply.find({
            $and: [{ "user.id": userId }, { "jobInfo.jobId": jobId }],
        });
        if (isExist.length === 0) {
            try {
                await User.findByIdAndUpdate(
                    userId,
                    { role: "Candidate", jobId },
                    { new: true }
                );
                const savedApply = await newApply.save();
                res.status(200).json(savedApply);
            } catch (error) {
                next(error);
            }
        } else {
            return next(createError(400, "Already applied for this job"));
        }
    } catch (error) {
        next(error);
    }
};
