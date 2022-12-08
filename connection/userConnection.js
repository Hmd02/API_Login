const mongoose=require("mongoose");

var uri="mongodb://localhost:27017/Api_Db";

mongoose.connect(uri,{useNewUrlParser:true})
.then(()=>
{
    console.log("Connected Succesfully");
})
.catch((error)=>
{
    console.log(error);
})

var db=mongoose.connection;

db.on("error",(error)=>
{
  console.log(error);
})
var User=db.model("Users",require("../schemas/userSchema.js"));

module.exports=User;