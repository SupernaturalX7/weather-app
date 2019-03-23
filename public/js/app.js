//Fun fact: this is NOT a part of Javascript. It's a browser based API. Which means... you can't debug it!
//Beware: the location of the script reference in HTML (app.js) will affect how the following logic will work. consider moving the script call below the necessary field rendering

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherResponseForecast = document.querySelector('#weatherResponseForecast')
const weatherResponseLocation = document.querySelector('#weatherResponseLocation')
const errorResponse = document.querySelector('#errorResponse')




weatherForm.addEventListener('submit', (event) => {
    //Prevent browser from refreshing and let function run
    event.preventDefault()
    //Extract input value from querySelector
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorResponse.textContent = data.error
            } else {
                weatherResponseLocation.textContent = data.location
                weatherResponseForecast.textContent = data.forecast
            }
        })
    })
})

