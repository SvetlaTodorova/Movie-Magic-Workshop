import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecuresecretkey"; 

export default function authMiddleware(req, res, next) {
    const token = req.cookies['auth']

    if (!token) {
        return next(); 
    }

    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.user = decodedToken; 
        next();
    } catch (err) {
        res.clearCookie("auth");
        return res.redirect("/auth/login"); 
}
}
