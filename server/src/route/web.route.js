import express from "express";

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const webRouter = express.Router();

webRouter.use(express.static(path.join(__dirname,process.env.PATH_STATIC_WEB)));

webRouter.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,process.env.PATH_STATIC_WEB,'index.html'));
});

webRouter.get('/dashboard',(req,res) => {
    res.sendFile(path.join(__dirname,process.env.PATH_STATIC_WEB+"/pages",'dashboard.html'));
});
export default webRouter;