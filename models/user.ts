import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const user = new Schema({
    name: {type: String, required: true, lowercase: true},
    age: {type: Number, required: true, min: 0, max: 100},
    sex: {type: String, enum: ['male', 'female'], required: true}
});

export default mongoose.model('User', user);