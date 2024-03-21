import { Router } from 'express'
import passport from 'passport'

const authRouter = new Router()

authRouter.post('/register', passport.authenticate('register', { failureMessage: 'El usuario ya existe' }), (req, res) => {
    return res.status(201).redirect('/api/users/loginUser')
})


authRouter.post('/login', passport.authenticate('login', { failureMessage: 'Usuario y/o contraseña incorrectos' }), (req, res) => {
    return res.status(201).redirect('/api/products/allProducts')
})

authRouter.get('/github', passport.authenticate('github', {}), (req, res) =>{});
authRouter.get('/callbackGithub', passport.authenticate('github', {}), (req, res) =>{
    req.session.user = req.user
    return res.status(201).redirect('/api/products/allProducts')
});


authRouter.get('/logout', (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.send('Error en logout')
            }
            res.redirect('/api/products/allProducts')
        })
    } catch (error) {
        console.log('Error encontrado: \n', error);
    }
})

export default authRouter