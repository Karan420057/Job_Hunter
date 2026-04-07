import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register
export const register = async (req, res) => {
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        const file = req.file;

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        };

        let profilePhoto;
        if (file) {
            if (!file.mimetype.startsWith("image/")) {
                return res.status(400).json({
                    message: "Only image files are allowed for profile photo",
                    success: false
                });
            }

            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "jobhunt/profile"
            });
            profilePhoto = cloudResponse.secure_url;
        }


        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists",
                success:false
            })
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profile: {}
            }
        });

        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// Login
export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body; 
        if(!email || !password || !role){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        };

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        };

        // check role is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message:"Account does not exist for this role",
                success:false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
 
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite: "Lax", secure:false}).json({    // new code
            message:`Welcome back, ${user.fullname}`,
            user,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}

// Logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// update profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills, role } = req.body;
        const file = req.file;

        if (file && file.mimetype !== "application/pdf") {
            return res.status(400).json({
                message: "Only PDF files are allowed",
                success: false
            });
        }

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.user.id;     // middleware authentication
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        };

        // updating data
        if(fullname) user.fullname = fullname;      // do not change
        if(email) user.email = email;       // do not change
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(role) user.role = role;      // do not change
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;

        // resume will come here...
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content,
                {
                    resource_type: "raw",
                    folder: "jobhunt/resumes"
                }
            );

            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}
