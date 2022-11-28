let jwt =  require('jsonwebtoken');
let data = require('./dev_blogs');
require('dotenv').config();
module.exports={
 get :(req,res)=>{
    let arr= req.headers["authorization"].split(' ')[1];
    let dec = jwt.decode(arr);
    console.log(req.body.title); 
  jwt.verify(arr,'SECRET_KEY',(err,result)=>{
    if(err)
    {
        res.send("Invaild Token");
    }
    else if((req.body.title && req.body.description) == "")
        {
            res.send(" the details are empty ");
    }
   /* else if(Object.keys(req.body).length == 0) 
    {
        res.send("please enter the title and description  ");
    }*/
    else
    {
        data.query(`SELECT title FROM posts WHERE user_id ='${dec.id}'`,(err,result)=>{
            if(err)throw err
            res.send(result);
         })
    }

    
  })
},

 post: (req,res)=>{ 
    let arr= req.headers["authorization"].split(' ')[1];
    let dec = jwt.decode(arr);
    //console.log(req.body); 
  jwt.verify(arr,'SECRET_KEY',(err,result)=>{
    if(err)
    {
        res.send("Invaild Token");
    }
    else if((req.body.title && req.body.description) == "")
        {
            res.send(" the details are empty ");
    }
    else if(Object.keys(req.body).length == 0) 
    {
        res.send("please enter the details ");
    }
    else
    {
    data.query(`INSERT INTO posts(title, description,user_id,number) VALUES ('${req.body.title}','${req.body.description}','${dec.id}',${req.body.number})`,(err,result)=>{
        if(err)
        {
            res.send ("Please check the post number");
        }
        else
        {
            data.query(`SELECT * FROM posts WHERE user_id ='${dec.id}'`,(err,result)=>{
                if(err)throw err
                res.send(result);
             })
        }
    })
   
    }
  })
 } 
}