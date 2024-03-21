import passport from "passport";
import local from 'passport-local';
import github from 'passport-github2';
import UserManagerMongo from "../dao/MongoDB/class/userManagerMongo.js";
import userModels from "../dao/MongoDB/models/userModels.js";
import CartsManagerMongo from "../dao/MongoDB/class/cartsManagerMongo.js";

const newCart = new CartsManagerMongo()
const newUser = new UserManagerMongo()
const LocalStrategy = local.Strategy;

export const initPassport = () => {
    //Registro de Usuario
    passport.use('register', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const user = await newUser.registerUser(req.body)
                if (!user) {
                    return done(null, false, 'El usuario ya existe')
                }
                return done(null, user)
            } catch (error) {
                done('Error al registrar el usuario', error)
            }
        }
    ))

    //Login de Usuario

    passport.use('login', new LocalStrategy(
        { usernameField: 'email', passReqToCallback: true },
        async (req, username, password, done) => {
            try {
                const user = await newUser.loginUser(req.body)
                if (!user) {
                    return done(null, false, 'Usuario y/o contraseña incorrectos')
                }
                return done(null, user)
            } catch (error) {
                done('Error al iniciar sesión', error)
            }
        }
    ))

    passport.use('github', new github.Strategy(
        {
            clientID: 'Iv1.bd3ccc0156b1e78b',
            clientSecret: '26ffe76380215d9d5e894c9adf65ed97b076cc07',
            callbackURL: 'http://localhost:8080/api/auth/callbackGithub'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const cart = await newCart.createCart()
                let {name, email} = profile._json
                let user = await userModels.findOne({email})
                if (!user) {
                    user = await userModels.create({
                        email: email,
                        first_name: name,
                        profile: profile,
                        rol: "usuario",
                        cart: cart._id
                    });   
                }
                done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((id, done) => {
        let user = userModels.findById(id);
        done(null, user)
    })
}