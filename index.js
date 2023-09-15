const express= require("express")
const https=require("https");
 const bodyparser=require("body-parser");
const app= express();

app.use(express.static("public"))
  app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(rep,res){
  
res.sendFile(__dirname+"/index.html");
 


 });
app.post("/",function(req,res){
  const query=req.body.cityname
  const apikey="7f04d1610612733793a95b2c5e1ae92b";
   const unit="metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+req.body.cityname+"&appid="+apikey+"&units="+unit;
  https.get(url,function(response){
  console.log(response.statusCode);
response.on("data",function(data){
const weatherdata= JSON.parse(data)
const weatherdir =weatherdata.weather[0].description;
const temp =weatherdata.main.temp
const icon=weatherdata.weather[0].icon;
const imgurl="http://openweathermap.org/img/wn/"+ icon + "@2x.png"
//    console.log(temp);
res.write("<p >The weather is currentlly "+weatherdir +" <p>");
res.write("<h1>The temprecture in "+query+ " is "+temp+"degree celcius</h1>");
res.write("<img src="+imgurl+">");
res.send();


})

 


})

})



 app.listen(3000,function(){
     console.log("server is conect on port 3000.");
 })