import { Router } from "express";

const logRouter = new Router();

logRouter.get('/loginUser', async(req, res) => {
    res.render('login.handlebars')
})

logRouter.get('/registerUser', async(req, res) =>{
    res.render('register.handlebars')
})

logRouter.get('/profileUser', async(req, res) =>{
    const user = req.session.user
    res.render('profile', { user })
})


export default logRouter