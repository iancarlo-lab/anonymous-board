const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repliesSchema = new Schema({
    comment: String,
     password: String
 },{
     timestamps: true
 });

var blogSchema = new Schema({
    title: String,
    comment: String,
    report: Boolean,
    password: String,
    replies: [repliesSchema]
},{
    timestamps: true
});



var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
