const request = require("request")

const geocoding = (address, callback)=>{
    
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmFzaXJqYW1hbDQ1NSIsImEiOiJja210Zm1lM2gwcjVhMm9vNG1keWMycnExIn0.Z0AAswBgLWfNdRmy13_2xg&limit=1"
request({url, json:true}, (error, response)=>{
if (error){
    callback("can't connect to the weather server", undefined)
}else if(response.body.features.length === 0){
    callback("unable to find the location please put a valid address", undefined)
}else{
    callback(undefined, {
        latitude:  response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location:  response.body.features[0].place_name
    } )
}
})

}



module.exports =geocoding