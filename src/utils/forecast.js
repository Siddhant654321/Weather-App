const request = require('postman-request');
const geocode = require('./geocode');
const forecast = (addr, callback) => {
    geocode(addr, (lat, lon, loc, err) => {
        let url = `http://api.weatherstack.com/current?access_key=350fb19f1e4a6aea4fc5c631cf193b0e&query=${lat},${lon}`;
        request({url, json:true}, (error, {body}) => {
            let err2;
            if(body.error || error) {
                err2 = 'We are unable to find the weather information of the address that you have typed. Please try again by entering a different location.'
            }
            data = {
                loc,
                temp: body.current.temperature, 
                feelslike: body.current.feelslike,
                weather_descriptions: body.current.weather_descriptions.toString(),
                err,
                err2
            }
            callback(data);
        });
    })
}
module.exports = forecast;