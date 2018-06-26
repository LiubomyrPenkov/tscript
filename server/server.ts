import * as express from 'express';
import * as path from 'path'; 
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import router from './router';
import users from './users';

const app: express.Application = express();

mongoose.connect('mongodb://liubomyr_penkov:liubomyr0@ds117681.mlab.com:17681/tscript', function(error) {
    console.log(error.message);
});

app.set('port', (process.env.PORT || 3030));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/users', users);
app.use('/', router);

app.use(function(err, req, res, next){
    res.json({
        "message": err.message,
        "stack": err.stack
    });
});

app.listen(app.get('port'), ()=>{
    console.log('running...');
});