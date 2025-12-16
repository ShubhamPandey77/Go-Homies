const User = require('../models/user');
const {setUser, hashPassword, comparePassword} = require('../Service/auth')

async function handleUserSignup(req,res){
    console.log("Welcome");
    try {
        const {name,email,username,password} = req.body;

        if(!name || !email || !username || !password) {
            return res.status(400).json({msg:"All fields are required"})
        }

        if(password.length < 6) {
            return res.status(400).json({msg:"Password must be at least 6 characters long"})
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({msg:"User already exists with this email"})
        }

        const usernameExists = await User.findOne({username});
        if(usernameExists) {
            return res.status(400).json({msg:"Username already taken"})
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            username,
            password: hashedPassword
        });

        return res.status(201).json({msg: "User created successfully", user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username
        }})
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({msg: "Error creating user", error: error.message})
    }
}

async function handleUserLogin(req,res){
    try {
        const {email,password} = req.body;

        if(!email || !password) {
            return res.status(400).json({msg:"Email and password are required"});
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({msg:"Invalid email or password"});
        }

        const isPasswordValid = await comparePassword(password, user.password);
        
        if(!isPasswordValid){
            return res.status(401).json({msg:"Invalid email or password"});
        }

        const token = setUser(user)
        res.cookie('uid', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });    
        
        return res.status(200).json({msg:"Logged In", user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            title: user.title,
            designation: user.designation,
            about: user.about,
            profileImage: user.profileImage,
            bio: user.bio,
            location: user.location
        }})
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({msg: "Server error during login", error: error.message});
    }
}

async function updateUserProfile(req,res){
    try {
        const {email,title,designation,about} = req.body;

        if(!email) {
            return res.status(400).json({msg:"Email is required"})
        }

        const updateFields = {};

        if(title) updateFields.title = title;
        if(designation) updateFields.designation = designation
        if(about) updateFields.about = about

        const user = await User.findOneAndUpdate(
            { email: email },         
            updateFields,   
            { new: true }              
        );

        if(!user) {
            return res.status(404).json({msg:"User not found"})
        }

        return res.status(201).json({msg:"User Updated Successfully",user})
    } catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({msg: "Error updating user", error: error.message})
    }
}



module.exports = {handleUserSignup,handleUserLogin,updateUserProfile}