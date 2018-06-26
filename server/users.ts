import * as express from 'express';
import * as path from 'path';
import User from '../models/user'

const router: express.Router = express.Router();

router.route('/')
    .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const queryObj = {};
        if (Object.keys(req.query).length) {
            Object.keys(req.query).forEach((param) => {
                if (param === 'age') {
                    queryObj[param] = {
                        $gte: +req.query[param]
                    }
                } else {
                    queryObj[param] = req.query[param];
                }
            })
        }
        try {
            res.json(await User.find(queryObj).exec());
        } catch (e) {
            next(e);
        }
    })
    .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await User.create(req.body);
            res.status(201).json({ "message": "the user is created" });
        } catch(e) {
            next(e);
        }
    });

router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    try {
        await User.remove({ "_id": req.params.id }).exec();
        res.status(200).json({ "message": "the user is deleted" });
    } catch(e) {
        next(e);
    }
    
});

export default router;
