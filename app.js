const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const https =require('https');
const mailchimp = require('@mailchimp/mailchimp_marketing');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.Email;
  var userData = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }],};

    mailchimp.setConfig({
   apiKey: "c6efe460eacfe783fbd74e8e245203cf-us6",
   server: "us6",
 });

 const run = async () => {
   try{
     const response = await mailchimp.lists.batchListMembers("6da2d7e3c2", userData );
     console.log(response);
     res.sendFile(__dirname + "/success.html");
   }
   catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + "/failure.html");
    }
 };
   run();
  console.log(firstname,lastname,email);
  });

  app.post("/failure", function(req, res) {
    res.redirect("/");
  });

app.listen(process.env.PORT || port,function(){
  console.log("server started on port 3000");
});

// API key
// c6efe460eacfe783fbd74e8e245203cf-us6

//
// list id
// 6da2d7e3c2.
