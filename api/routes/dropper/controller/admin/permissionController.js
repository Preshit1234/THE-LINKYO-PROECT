const { validationResult } = require('express-validator');

const addPermissions = async(req, res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(200).json({
                success : false,
                msg : 'Errors',
                errors : errors.array()
            })
        }

        const { permission_name } = req.body;
    }catch(err){
        return res.status(400).json({
            success: false,
            msg : err.message
        })
    }
}
console.log(addPermissions);
module.exports=({addPermissions});