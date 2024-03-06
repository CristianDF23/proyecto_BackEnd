import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'

const authRouter = new Router()

const users = []


authRouter.post('/regisUser', (req, res) => {
    const { email, password, first_name, last_name, phone, age } = req.body
    let role = 'usuario'

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        role = 'admin'
    }

    const userNew = {
        email,
        password,
        first_name,
        last_name,
        phone,
        age,
        role
    }

    req.session.user = userNew
    userNew.id = uuidv4()
    users.push(userNew)
    res.redirect('/api/users/loginUser')
})


authRouter.post('/logUser', (req, res) => {
    let userNew = req.body
    let userFound = users.find(user => {
        return user.email == userNew.email && user.password == userNew.password
    })
    if (userFound) {
        req.session.user = userFound
        res.redirect('/api/users/profileUser')
        console.log('Login Correcto');
    } else {
        res.status(401).send('Usuario o contraseña incorrecto')
    }
})

authRouter.get('/logoutUser', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send('Error en logout')
        } else {
            res.redirect('/api/products/allProducts')
        }
    })
})

export default authRouter