import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth } from "../middleware/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";



const authController = Router();


authController.get('/register', (req, res) =>{
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData=req.body;
try{
    await authService.register(userData);
    res.redirect('/')
} catch(err) {
    const error=getErrorMessage(err);
    res.render('auth/register', {error})

}
    
   
});

authController.get('/login', (req,res) => {
    res.render('auth/login');
});

authController.post('/login',async (req, res) => {
    const {email, password} = req.body;
    try{  
        const token= await authService.login(email, password);
        res.cookie('auth', token)
        res.redirect('/')}
    catch(err) {
        console.log(err.message);
        res.redirect('/404')
     }
   
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/')
})


export default authController;
 