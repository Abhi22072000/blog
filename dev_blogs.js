const dev_blogs = require('mysql');
module.exports=dev_blogs.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: 'dev_blogs'
});

