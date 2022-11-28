let jwt = require('jsonwebtoken');
let data = require('./dev_blogs');
module.exports = {
    post:(req,res)=>{
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
    else if(Object.keys(req.body).length == 0)
    {
        res.send("Please enter the valid title and commands")
    }
    else
    {
        data.query(`SELECT title,description,comments FROM comments INNER JOIN posts ON posts.user_id = '${dec.id}' AND posts.title = '${req.body.title}' AND comments.comments='${req.body.comments}';`,(err,result)=>{
            if(err)
            {
                res.send(err);
            }
            else
            {
                const ele = result.filter((element)=>{
                    if(element.title == req.body.title)
                    {
                        return element;
                    }
                })
            data.query(`UPDATE comments INNER JOIN posts ON posts.title = '${req.body.title}' SET comments = '${req.body.comments}' WHERE comments.post_id = '${dec.id}' AND posts.title = '${req.body.title}' `,(err,result)=>{
            if(err)throw err
            res.send('Updated');
        })
         }
        })
    }
})
    }
}
