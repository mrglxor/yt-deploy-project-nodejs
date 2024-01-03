import mongoose from "mongoose";

const mongoDB = mongoose.connect(process.env.DB_URL);

export default mongoDB;