import { Job } from "../models/job.model.js";

// posting job
export const postJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, location, companyId, jobType, experience, vacancy} = req.body;
        const userId = req.user.id;
        if(!title || !description || !requirements || !salary || !location || !companyId || !jobType || !experience || !vacancy) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            company: companyId,
            jobType,
            experienceLevel: Number(experience),
            vacancy,
            created_by: userId
        });
        return res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job
        })
    } catch (error) {
        console.log(error);
    }
}

// get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options:"i"}},
                {description: {$regex: keyword, $options:"i"}}
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt: -1});
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// get job by id
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate([
            { path: "company" },
            {
                path: "applications",
                populate: {
                    path: "applicant",
                    select: "fullname email phoneNumber profile"
                }
            }
        ]);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        };

        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// admin jobs
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.id;
        const jobs = await Job.find({created_by: adminId}).populate({
            path: "company",
            createdAt: -1,
        });
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
