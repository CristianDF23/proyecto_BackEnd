import { Router } from "express";
import passport from "passport";

const sessionRoute = Router()

sessionRoute.get('/github', passport.authenticate('github', {}), (req, res) =>{});
sessionRoute.get('/callbackGithub', passport.authenticate('github', {}), (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({payload: 'ok'})
});

export default sessionRoute;