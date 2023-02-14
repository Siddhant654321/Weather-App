const request = require('postman-request');

const geocode = (addr, callback) => {
    let url = `https://api.tomtom.com/search/2/geocode/${addr}.json?key=ixp8m5wWAhsieuknAR7j7a66bXIcGZmu&limit=1`;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback(null, null, null, 'We are facing some difficulties while processing your request. Please check your connection and try again.');
        } else if(body.errorText || body.summary.numResults == 0 ){
            callback(null, null, null, 'We are unable to find the address that you have typed. Please try again by entering a different location.');
        } else {
            let loc= `${body.results[0].address.freeformAddress}, ${body.results[0].address.country}`;
            callback(body.results[0].position.lat, body.results[0].position.lon, loc);
        }
    })

}
module.exports = geocode;