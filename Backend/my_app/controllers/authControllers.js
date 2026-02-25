const bcrypt = require('bcryptjs')
const Admin = require('../models/Admin');
const jwt  = require('jsonwebtoken')

exports.loginAdmin = async (req,res) => {
    try{
        const { email, password} = req.body;

        const admin = await Admin.findOne({email});

        if (!admin){
            return res.status(400).json({ message: "Invalid email" })
        }
        const isMatch = await bcrypt.compare(password,admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            {id:admin._id},
            "supersecretkey",
            {expiresIn:"100d"}
        );
        res.json({ token }); 
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
};


exports.registerAdmin = async (req,res) => {
    try{
        const { email, password, adminKey} = req.body

        if (adminKey != process.env.ADMIN_SECRET){
            return res.status(403).json({message:"Unauthorized to register admin"});
        }
        
        const hashed = await bcrypt.hash(req.body.password,8);

        const admin = new Admin({
            email:req.body.email,
            password:hashed
        });
        await admin.save()
        res.json({ message: "Admin created" });
    }catch (err){
        res.status(500).json({ error: err.message });
    }
};


