const request = require('request')

module.exports = forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c474ba389bbd39f458ceb1aedf25caa3/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}