const express = require('express');
const blogs = express();
const route=require("./router");
blogs.use('/',route);
//blogs.use(express.json());
blogs.listen(8080);