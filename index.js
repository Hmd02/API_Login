const express=require('express')
const app=express()
const bodyParser = require('body-parser');

const User=require("./connection/userConnection");

//Middleware functions
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))


app.post("/api/login",(req,res)=>{
    var username=req.body.username;
    var pass=req.body.password;

    User.findOne({username:username,password:pass},(e,user)=>
    {
       if(e)
       {
        res.send("Unexpected error,try again");
       }
       if(user===null)
       {
        res.send("User Dosen't exist,Check Credentials");
       }
       else
          res.send("Successfully Logged In");
    })

})

app.post("/api/register",(req,res)=>{

   var username=req.body.username;
   var pass=req.body.password;
   var email=req.body.email;
 
   User.insertMany([{username:username,password:pass,email:email}],(e)=>
   {
    console.log(e)
       if(e)
      {
        res.send("Unexpected error,try again");
      }
      else
         res.send("Successfully Registered");
   })
})

app.post("/api/forget",(req,res)=>{

    var username=req.body.username;
    var conf_pass=req.body.conf_pass;
    var email=req.body.email;
  
    User.updateOne({username:username,email:email},{password:conf_pass},(e,user)=>
    {
        console.log(user)
        if(e)
       {
         res.send("Unexpected error,try again");
       }
       if(user.modifiedCount==0)
       {
        res.send("User Dosen't exist,Check Credentials");
       }
       else
          res.send("Sucessfully Changed");
    })
 })


app.listen(8000,()=>
{
    console.log("Server running on port 8000");
})