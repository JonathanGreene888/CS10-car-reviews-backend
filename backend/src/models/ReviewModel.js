const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    car: { 
        type: ObjectId, 
        ref: 'CarModel',
        required: true
    },
    user: { 
        type: ObjectId, 
        ref: 'UserModel',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    score: {
        type: Number, 
        required: true
    },
    createOn: {
        type: Date,
        default: Date.now()
    }
});

const ReviewModel = mongoose.model('reviews', ReviewSchema);
exports.schema = ReviewSchema;

module.exports = ReviewModel;