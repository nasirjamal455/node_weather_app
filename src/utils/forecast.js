const request = require("request")


const forecast = (latitude, longitude, callback)=>{
    const url = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=2cc2957c2e23d00aa40381a90d260a58&units=metric"
    request({url, json:true}, (error,response)=>{
        if(error){
        callback("unable to connect with server", undefined)
        } else if (response.body.weather.length===0){
            callback("unable to find the location", undefined)
        }else{
            callback(undefined, "its currently " +response.body.main.temp+ " degrees out. there is "+response.body.clouds.all+" percent of rain.")
        }
    })
}
module.exports = forecast