const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));


app.listen(3000, function() {
    console.log("Server listening to port 3000.");
});

app.get("/", function(req,res) {
    // res.sendFile(__dirname + "/index.html");
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req,res) {
    console.log("Post received");

    let query = req.body.cityName;
    let apiKey = "7e4d7d29cf46d579760c9c775b48862f";
    let units = "metric";

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response) {
        console.log("Code:" + response.statusCode);

        response.on("data", function(data) {
            let weatherData = JSON.parse(data);
            // console.log(weatherData);
            
            let temp = weatherData.main.temp;
            let desc = weatherData.weather[0].description;
            let feels = weatherData.main.feels_like;
            let icon = weatherData.weather[0].icon;
            let iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.write("<h1>The temperature is " + temp + " and it feels like " + feels + " degrees Celsius.</h1>");
            res.write("<img src="  + iconURL + ">"); // no need to close img tags
            res.write("The weather is currently " + desc);
 
            res.send();
            // console.log(desc);
            // console.log(temp);
            // console.log(feels);
        });

    //YOU CAN ONLY SEND 1 res.send per GET METHOD !!!
    // res.send("Server is running");
    });
});

    

