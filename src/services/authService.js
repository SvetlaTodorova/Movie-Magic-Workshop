
import User from "../models/User.js"; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "supersecuresecretkey"; 

export default {
    async register(userData) {
        const emailCount= User.countDocument(userData.email);
        if(emailCount>0) {
            throw new Error('This email already exists')
        };

        if(userData.password !== userData.rePassword) {
            throw new Error('The passwords mismatch')
        };

        const salt = await bcrypt.genSalt(10)
        userData.password =  await bcrypt.hash(userData.password, salt)
        
        return User.create(userData);
    },
    async login(email, password) {

        const user= await User.findOne({email});

        if(!user) {
            throw new Error('Invalid email')
        }

        const isValid=await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid password')
        }
        
        const payload={
        id: user.id,
        email: user.email
        }
        const token = jwt.sign(payload, SECRET, {expiresIn: '2h'})
        return token
    

    }
}