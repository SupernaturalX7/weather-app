const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.argv[2] || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

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