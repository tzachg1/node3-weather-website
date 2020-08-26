const request = require('request')

const forecast = (altitude,longitude,callback) => {
const url = 'http://api.weatherstack.com/current?access_key=be99bf5ea022546c968169021e676658&query='+longitude +','+ altitude+ '&units=m'

request({ url,json:true },(error,{body}) => {
    if(error){
        callback('Unable to connect tot weather services')
    }else if(body.error){
        callback('Unable to find location',undefined)
    }else{
        callback(undefined,body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' but it feels like ' + body.current.feelslike +  
        ' the wind speen is ' + body.current.wind_speed + 'and the humidity is ' + body.current.humidity +"%")
    }
    })
}
    module.exports = forecast