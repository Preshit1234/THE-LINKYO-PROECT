const router = require("express").Router();
const Lists = require("../../../models/Dropper/lists");
const verify = require("../../../verifyToken");

//CREATE A List
//Note : Only LINKYO Admins can create a list.

router.post("/add", verify, async (req,res)=>{
    if(req.user.isAdmin) {
        const newList = new Lists(req.body)
        try{
            const savedList = await newList.save();
            res.status(200).json(savedList);
        }catch(err){
        res.status(500).json(err);
        } 
    } else {
        res.status(403).json("You are not allowed")
    }
});


//Delete a List
//Note : Only LINKYO ADMINs can delete a list

router.delete("/:id", verify, async (req,res)=>{
    if(req.user.isAdmin) {
        try{
            await Lists.findByIdandDelete(req.params.id);
            res.status(200).json("The lists has been deleted");
        }catch(err){
        res.status(500).json(err);
        } 
    } else {
        res.status(403).json("You are not allowed");
    }
});

//Get LISTS

router.get("/getlists", async (req,res)=>{
    const typeQuery = req.query.type;
    const tagsQuery = req.query.tags;
    let list = [];

    try{
        //For ex. If type is paid and tags is AI
        if(typeQuery){
            if(tagsQuery){
                list = await Lists.aggregate([
                    {$sample : { size: 10 }},
                    {$match : { type: typeQuery, tags: tagsQuery }},
                ]);
            }
            //For ex. If type is Paid and there is no tag
            else{
                list = await Lists.aggregate([
                    {$sample : { size: 10 }},
                    {$match : { type: typeQuery }}, 
                ]);
            }
        }
        //for ex. If type is random and tag is random
        else{
            list = await Lists.aggregate([{ $sample : { size: 10 } }])
        }
        res.status(200).json(list);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;