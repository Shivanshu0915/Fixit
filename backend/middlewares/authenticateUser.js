const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_JWT_TOKEN_SECRET);
        if (!decoded.email || !decoded.role || !decoded.id) {
            return res.status(403).json({ error: "Invalid token" });
        }

        // Attach user details to request object
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next(); 
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(403).json({ error: "Invalid or expired token" });
    }
};

module.exports = authenticateUser;
