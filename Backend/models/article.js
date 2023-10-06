import mongoose from "mongoose";

const Article = mongoose.model('Article', {
    title: String,
    createdAtDisplayDate: String,
    createdAt: Number,
    createdBy: String,
    modifiedAt: Number,
    modifiedAtDisplayDate: String,
    modifiedBy: String,
    text: String,
    imageURL: String,
    articleID: String
});

export default Article;