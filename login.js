const jwt = require('jsonwebtoken');
let data = require('./dev_blogs');
require('dotenv').config();
module.exports = {
    post :(req,res)=>{
       /* data.connect((err)=>{
            if(err) throw err
            console.log("connected");
        })*/
        let objects={
            id : req.body.id
        }
        
        //if((req.body.username ))
        //console.log(req.body.username)
         data.query(`SELECT * FROM users WHERE  username = '${req.body.username}' AND password= '${req.body.password}'`,(err,result)=>{
          //  console.log(result);
            if(result.length == 0)
            {
                res.send("Invalid Username and Password ");
            }
            else
            {
                let token=jwt.sign(objects,'SECRET_KEY',{expiresIn:'7d'});
                res.json({
                    "token":token
                });
                
            }

        })
    }
}