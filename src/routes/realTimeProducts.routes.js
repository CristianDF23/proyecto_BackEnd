import { Router } from 'express'

const routerRealTime = new Router()

routerRealTime.get('/', (req, res) => {
    res.render('realTimeProducts')
})

export default routerRealTime