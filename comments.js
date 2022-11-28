let jwt =  require('jsonwebtoken');
let data = require('./dev_blogs');
module.exports={
    get:(req,res)=>{
        let arr= req.headers["authorization"].split(' ')[1];
        console.log(arr);
       let dec = jwt.decode(arr);
       //console.log(dec.id); 
       let title=req.body.title;
       console.log(title);
  jwt.verify(arr,'SECRET_KEY',(err,result)=>{
    if(err)
    {
        res.send("Invaild Token");
    }
   /* else if((req.body.title || req.body.description || req.body.comments) == "")
        {
            res.send(" the details are empty ");
    }
    else if(Object.keys(req.body).length == 0) 
    {
        res.send("please enter the details ");
    }*/
  
    else
    {
    data.query(`SELECT title,description,comments FROM comments INNER JOIN posts ON posts.number ='${req.body.number}';`,(err,result)=>{
        if(err)
        {
            res.send (err);
        }
        else
        { 
            res.send(result);
            /*const ele=result.filter((element)=>{
              if(element.title == title)
              {
                return element ;
              }
            })
            res.send(ele);*/
            
        }
    })
    } 
}) 
},
    post:(req,res)=>{
        let arr= req.headers["authorization"].split(' ')[1];
        console.log(arr);
       let dec = jwt.decode(arr);
       console.log(req.body.comments); 
  jwt.verify(arr,'SECRET_KEY',(err,result)=>{
    if(err)
    {
        res.send("Invaild Token");
    }
    else if(req.body.comments == "")
        {
            res.send(" the details are empty ");
    } 
    else if(Object.keys(req.body).length == 0)
    {
        res.send("Please enter the comment to be added");
    }
    else
    {
    data.query(`INSERT INTO comments(post_id,comments,number) VALUES ('${dec.id}','${req.body.comments}','${req.body.number}')`,(err,result)=>{
        if(err)
        {
            res.send (err);
        }
        else
        {
            data.query(`SELECT * FROM comments WHERE post_id = '${dec.id}'`,(err,result)=>{
                if(err)throw err
                res.send(result);
            })
        }
    })
   
    }
  })
},
}


/*
Get Single User

    -> Retrieve all the post of the User

        -> Retrive all the commments of that post
        */