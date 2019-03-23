const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')


const app = express()
const port = process.env.PORT || 3000

//Static paths for content
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(publicDirectoryPath)

//Define paths for Express configurations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory for serving
app.use(express.static(publicDirectoryPath))

//Setup Handlebars engine and views location
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kyle Thumser'
    })
})

//Server route logic
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kyle Thumser'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'How can I help you?',
        title: 'Help',
        name: 'Kyle Thumser'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if (err) {
            return res.send(err)
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({err})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Sorry! You\'ve navigated to a page that does not exist. Please try one of the following links:'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'Sorry! You\'ve navigated to a page that does not exist. Please try one of the following links:'
    })
})

app.listen(port, () => {
    console.log('Server has started on port: ' + port)
})