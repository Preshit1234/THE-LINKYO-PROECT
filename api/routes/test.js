const router = require("express").Router();
const Test = require("../models/Test/Test");

//CREATE A Test

router.post("/test", async (req,res)=>{
    const newTest = new Test(req.body)
    try{
        const savedTest = await newTest.save();
        res.status(200).json(newTest);
    }catch(err){
        res.status(500).json("err")
    }
});




//GET A Test

router.get("test/:id", async (req,res)=>{
    try{
        const test = await Test.findById(req.params.id);
        res.status(200).json(test)
    }catch(err){
        res.status(200).json(err);
    }
})

router.get("/hon", async (req, res) => {
    try{
       await res.status(200).json("Hello world")
    }catch(err){
        res.status(200).json(err);
    }
})

module.exports = router;