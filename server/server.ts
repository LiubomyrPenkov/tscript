import * as express from 'express';
import * as path from 'path'; 
import router from './router.ts'

const app: express.Application = express();

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/', router);

app.listen(3000, ()=>{
    console.log('running on 3000 port');
});