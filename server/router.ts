import * as express from 'express';
import * as path from 'path';

const router: express.Router = express.Router();

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    console.log('Root page');
    next();
});

router.get('/', (req: express.Request, res: express.Response)=>{
    res.sendFile(path.resolve(__dirname, '../dist/assets/index.html'));
});

export default router;
