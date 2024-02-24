const express=require('express');
const app=express();
const PORT=3000;
const hostName=`127.0.0.1`;
const chalk=require('chalk');
const mongoose = require('mongoose');

app.use(express.urlencoded({extended:true}))
app.use(express.json());

const product=mongoose.model('product',new mongoose.Schema({},{strict:false}));

app.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="text-align:center;margin-top:50px">Welcome to home page</h1>`)
})

app.get('/products',async(req,res)=>{
    try {
        const allProducts=await product.find();
        res.status(200).send(allProducts);
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        const id=req.params.id

        //find return array of object
        // const singleProduct=await product.find({_id:id});

        //findOne return object
        const singleProduct=await product.findOne({_id:id});

        //without using select
        // const singleProduct=await product.findOne({_id:id},{title:1,_id:0});

        //with using select
        // const singleProduct=await product.findOne({_id:id}).select({title:1,_id:0,price:1,description:1});

        if(singleProduct){
            res.status(200).send({
                success:true,
                message:"return Single Product",
                data:singleProduct
            });
        }
        else{
            res.status(404).send({
                success:false,
                message:"product not found"
            })
        }
    } catch (error) {
        res.status(500).send({message:error.message});
    }
})

const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/productsDB');
        console.log(chalk.bgGreen.bold(`db is connected`));
    } catch (error) {
       console.log(chalk.bgRed.bold(`db is not connected`));
       console.log(error);
       process.exit(1); 
    }
};

app.listen(PORT,hostName,()=>{
    console.log(chalk.bgRed.bold(`Server is running at http://${hostName}:${PORT}`));
    connectDB();
});