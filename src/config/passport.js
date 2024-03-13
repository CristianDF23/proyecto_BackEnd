import passport from "passport";
import github from 'passport-github2';

export const initPassport = () => {
    passport.use('github', new github.Strategy(
        {
            clientID: 'Iv1.bd3ccc0156b1e78b',
            clientSecret: '26ffe76380215d9d5e894c9adf65ed97b076cc07',
            callbackURL: 'http://localhost:8080/api/sessions/callbackGithub'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
            } catch (error) {
                return done(error)
            }
        }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})