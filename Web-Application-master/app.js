const express=require('express');
const https = require('https');
const ejs = require("ejs");
app = express();
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"))

app.get("/",function(req,res){
  res.render("index1.ejs");
})



app.post("/",function(req,res){

  const query =  req.body.city;
  const api = "e443f8052da953d8de958da1ade5ee50";


  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&units=metric&appid='+api;
  https.get(url,function(response){
    response.on('data',function(data){
      const weather = JSON.parse(data);
      const image = "https://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png";
      res.render("result", {description:weather.weather[0].description, temprature:weather.main.temp, query:query, src:image});
      res.send();
    });
  });
});









app.listen(process.env.PORT || 3000);
