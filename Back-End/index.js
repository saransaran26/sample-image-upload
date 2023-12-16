import express from 'express'
import mongoose from 'mongoose'
import ImageModel from './models/image.js';
import multer from 'multer';
import cors from 'cors'
import path from 'path';


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const MONGODBURL =
  "mongodb+srv://saranchakravarthy26:saran@mern.btfsbi4.mongodb.net/?retryWrites=true&w=majority";
//const DBURL="mongodb+srv://saranchakravarthy26:guvi@b49tamil.zmmqlo1.mongodb.net/"
mongoose
  .connect(MONGODBURL)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));


app.get('/getdata',async(req,res)=>{
    try {
        const data = await ImageModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'public/Images')
    },
    filename:(req,file,cb) => {
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})

app.post('/upload',upload.single('file'),async(req,res)=>{
    //console.log(req.file);
    const saved = req.file.filename
    try {
        const result = await ImageModel.create({image:saved})
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})


app.listen(3001,()=>{
    console.log("server is running on port 3001");
})

