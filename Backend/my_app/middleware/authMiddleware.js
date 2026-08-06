const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // Attach the payload to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};


const Admin = require("../models/Admin");

exports.verifyAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ message: "Unauthorized" });
        const admin = await Admin.findById(req.user.id).select("_id email");
        if (!admin) return res.status(403).json({ message: "Access denied" });
        req.admin = admin;
        next();
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};