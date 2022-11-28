let data= require('./dev_blogs');
//const jwt = require('jsonwebtoken');
module.exports={
    get: (req,res)=>{
        data.connect((err)=>{
            if(err)throw err
        })
        data.query(`SELECT title FROM posts`,(err,result)=>{
            if(err) throw err
            res.send(result);
        })
    },
    post : (req,res)=>{
       console.log(req.body);
       if(Object.keys(req.body).length == 0)
       {
        res.send("please enter the details");
       }
       else if((req.body.id || req.body.username || req.body.password || req.body.email_id || req.body.mobile_number) == 0){
        res.send("please the details entered")
       }
       else{
        data.query(`INSERT INTO users(id,username,password,email_id,mobile_number) VALUES('${req.body.id}','${req.body.username}','${req.body.password}','${req.body.email_id}','${req.body.mobile_number}')`,(err)=>{
            if(err) throw err
            res.send("Sign up Successful");
        })
    }
    }
    }
