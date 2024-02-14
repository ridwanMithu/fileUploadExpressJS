
// const express = require('express')
import express from 'express';
const app = express()
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
// when importing files automatically it often do not use the extension. Always come back and add the extension by yourself like in the below import it didn't use .js after multerConfig
import FileStorage from './utility/multerConfig.js';
//initializing dot env file
dotenv.config();
// initializing cors
app.use(cors());
//initializing express.json file. whenever we are sending json file then we have to use express.json
app.use(express.json());
// hiding the port in env file and connecting it with the port variable. additional port is connected just to make sure that if for any reason 8000 is occupied then server will use 4000
const port = process.env.PORT || process.env.ALT_PORT;
// get request for testing the server is working properly
app.get('/', (req, res) => {
  res.send('Hello World!');
})

// post request with a built in json data just to make sure our post requests are woring properly
app.post('/addproducts', async (req, res) => {
  const {name, price}=await req.body;
  console.log(req.body);
  const userData={
    //if key and value is same then we do not have to write "name":"name" only value will suffice
    name,price,
  };
  // always remember res.send cannnot take two objects. if we have to send two objects then we have to use an aarray of objects so that it can handle that.
  res.send({status:"success",data:userData, message:"successfully added"});
})

app.post("/findproducts/search?", (req, res) => {
  const {q} = req.query;
  console.log(q);
  res.send({status:"success", message:"successfully added"}); 
})


//custom middleware to declare file upload parameter
const productImage=multer({
  storage: FileStorage
}).fields([
  {name: "imageFile", maxCount: 1},
  {name: "gallery", maxCount: 3},
]);
// we can also use fields. see https://www.npmjs.com/package/multer for documentation or it can be single or array

//do  not forget to use a comma after the middleware named product Image
app.post("/uploadProducts", productImage, (req, res) => {
  //req.body.Name remember you have to write the key name as it is. If you write it in capital letter you have to write after body in capital leter. req.body.name won't work
  console.log(req.file)
  const imageData=
  {
    // path: req.file.path, 
    name: req.body.originalname, 
    // size: req.file.size
  };
  res.send({status:"Success", 
  data: imageData,  
  message:`${req.body.imageFile} successfully uploaded`});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})