import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    name: String,
    token: String
});

const User = mongoose.model('User',userSchema);

export default {
    User
}