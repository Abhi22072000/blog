const express = require('express');
const parser=  require('body-parser');
const jsonparser = parser.json();
const route = express.Router();
const signup = require('./signup');
const login = require('./login'); 
const posts = require('./posts');
const comments = require('./comments');
const update = require('./update');
const users =  require('./user');
route.post('/user/posts',jsonparser,users.post);
route.get('/user',users.get);
route.put('/user/comments',jsonparser,users.put);
route.get('/show',signup.get);
route.get('/index',jsonparser,posts.get);
route.post('/signup',jsonparser,signup.post);
route.post('/login',jsonparser,login.post);
route.post('/posts',jsonparser,posts.post);
route.post('/comments',jsonparser,comments.post);
route.get('/indpost',jsonparser,comments.get);
route.post('/comments/update',jsonparser,update.post);
//route.put('/post',controller.put);
//route.delete('/delete',controller.delete);
module.exports = route;