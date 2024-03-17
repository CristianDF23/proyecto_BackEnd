import { Router } from "express";

const userRoute = new Router();

userRoute.get('/loginUser', async (req, res) => {
    res.render('login.handlebars')
})

userRoute.get('/registerUser', async (req, res) => {
    res.render('register.handlebars')
})


export default userRoute