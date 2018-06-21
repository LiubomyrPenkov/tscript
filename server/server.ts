import * as express from 'express';
import * as path from 'path'; 
import router from './router'

const app: express.Application = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/', router);

app.listen(app.get('port'), ()=>{
    console.log('running...');
});