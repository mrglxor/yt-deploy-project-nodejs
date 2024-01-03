import ResponseError from "../error/response-error.js";
import Models from "../model/Models.js";
import { getUserValidation, loginUserValidation, registerUserValidation } from "../validation/user.validation.js";
import validate from "../validation/validation.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation,request);

    const countUser = await Models.User.countDocuments({username: user.username});

    if(countUser === 1){
        throw new ResponseError(400, 'Username already Exists');
    }

    user.username = user.username.toLowerCase();

    user.password = await bcrypt.hash(user.password,10);

    const newUser = await Models.User.create(user);

    return await Models.User.findById(newUser._id).select({
        username: true,
        name: true,
        _id: false
    }).lean();
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation,request);

    const user = await Models.User.findOne({username: loginRequest.username}).select('username password').exec();

    if(!user){
        throw new ResponseError(401,'Username or password wrong');
    }
    
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    
    if(!isPasswordValid){
        throw new ResponseError(401,'Username or password wrong');
    }

    const token = uuid().toString();    

    return await Models.User.findOneAndUpdate({username: user.username},{$set: {token: token}},{new: true,select: {token: 1, _id: 0}}).exec();
}

const get = async (username) => {
    username = validate(getUserValidation,username);

    const user = await Models.User.findOne({username: username}).select('username name').exec();

    if(!user){
        throw new ResponseError(404,'User is not found');
    }

    return user;
}

export default {
    register,
    login,
    get
}