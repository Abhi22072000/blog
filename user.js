const jwt = require('jsonwebtoken');
const comments = require('./comments');
const data = require('./dev_blogs');
module.exports={
    get:(req,res)=>{
        //const comments=[];
        let arr= req.headers["authorization"].split(' ')[1];
        //console.log(arr);
        let dec = jwt.decode(arr);
        console.log(req.query.id);
        let user={};
        let posts={};
        let comment={};
        data.query(`SELECT * FROM users WHERE id=${req.query.id}`,(err,result)=>{
            if(err) throw err
            else
            {
                let array=[];
                 user= result[0];
                data.query(`SELECT * FROM posts WHERE user_id ='${req.query.id}'`,(err,result)=>{
                    if(err) throw err
                    else
                    {
                        posts=result;
                        if(posts.length == 0)
                        {
                            res.send({
                                user: user.username,
                                mobilenumber:user.mobile_number,
                                email:user.email_id,
                                posts:posts,
                                msg:"there are no posts fpr this current user"
                            })
                        }
                        else
                        {
                            data.query(`SELECT * FROM comments WHERE post_id='${req.query.id}'`,(err,result)=>{
                                if(result.length== 0)
                                {
                                    
                                    res.send({
                                        user: user.username,
                                        mobilenumber:user.mobile_number,
                                        email:user.email_id,
                                        posts: posts,
                                        comments: result,
                                        msg:"There are no comments for this current users post"
                                    })
                                }
                                else
                                {
                                let title="";
                                let description="";
                                posts.map((post)=>{
                                    result.map((cmd)=>{
                                        if(post.number == cmd.number)
                                        {
                                            title=post.title;
                                            description=post.description;
                                        }
                                        
                                    })
                                })
                                array.push({
                                    title:title,
                                    description:description,
                                    comments:result
                                })
                                res.send(
                                    {
                                        username:user.username,
                                        email:user.email_id,
                                        mobilenumber:user.mobile_number,
                                        posts : array
                                    }   
                                    );
                                }
                            })
                        }
                    }
                
                })
            
            }
        })
       // res.send(user)
       /* data.query(`SELECT * FROM users WHERE id=${req.query.id}`,(err,result)=>{    
        if(err) throw err
        else
        {    
            user=result[0];
            data.query(`SELECT * FROM posts WHERE user_id ='${req.query.id}'`,(err,post)=>{
                if(err) throw err
                
                else{
                    posts= post;
                    data.query(`SELECT * FROM comments`,(err,cmd)=>{
                        if(err)throw err
                        else{
                            let arr=[];
                            posts.map((ele)=>{
                                cmd.fil((comment)=>{
                                    console.log(comment);
                                    if(ele.number == comment.number)
                                    {
                                        arr.push({
                                            user: user.username,
                                            posts: ele,
                                            comments:comment
                                        })
                                    }
                                })
                            })
                        
                        }
                    })
                }
            })
        }
    })*/
                        /*if(element.number == element.user_id)
                        {
                            arr.push({
                                "posts": element
                            })    
                        }*/
                    //})
                   
                   /* data.query(`SELECT * FROM comments`,(err,result)=>{
                        
                        if(err)throw err
                        //console.log(result)
                      
                        
                        posts.map((post)=>{
                            result.map((cmd)=>{
                                if(post.number == cmd.number)
                                {
                                    arr.push({
                                        comments: cmd
                                    })
                                    
                                }*/
                               
                              /*  else{
                                    arr.push({
                                        posts: post,
                                        comment: "no commands"
                                    }
                                    )
                                }
                            })
                        })*/
                    
                        /*res.send({
                            // "user":user,
                            // "posts" : posts,
                            // "comments":comment
                            user : {
                                user  : user.username,
                                email : user.email,
                                posts:arr
                            }
                          });

                    })
                    
                }
            })
        }           
        })*/
        //res.send(user);
        
    },
    post:(req,res)=>{
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
        /*else if(Object.keys(req.body).length == 0) 
        {
            res.send("please enter the details ");
        }*/
        else
        {
        
                data.query(`SELECT * FROM posts WHERE user_id ='${dec.id}'`,(err,result)=>{
                    if(err)throw err
                    res.send(result);
                 })
            }
       
      })
    },
put:(req,res)=>{
    data.query(`SELECT * FROM comments WHERE number='${req.body.number}'`,(err,result)=>{
        if(err)throw err
        res.send(result);
    })
}
}