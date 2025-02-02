
import User from "../models/User.js"; 
import bcrypt from 'bcrypt'
export default {
    async register(userData) {
        
        const salt = await bcrypt.genSalt(10)
        userData.password =  await bcrypt.hash(userData.password, salt)
        
        return User.create(userData);
    };
    async login(email, password) {

        const user= await User.findOne(email);

        if(!user) {
            throw new Error('Invalid email')
        }

    }
}