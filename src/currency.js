let dayjs = require('dayjs')

import Chart from 'chart.js/auto';

let currencyChart 

// all selectors in the app
const currencyIHave = document.querySelector("#currency-one")
const currencyIWant = document.querySelector("#currency-two")
const amountIHave = document.querySelector("#amount-i-have")
const amountIWant = document.querySelector("#amount-i-want")
const exchangeRate = document.querySelector("#exchange-rate")
const graphCanvas = document.querySelector("#currency-graph")

//currencies avaliable in the dropdown
const listOfCurrencies = ["EUR", "CHF", "AUD", "GBP", "JPY", "USD"]

// object storing variables for api requests
const currency = {
    one: currencyIHave.value,
    two: currencyIWant.value,
    dateNow: null,
    dateThen: null
}


// set curriencies from dropdown
const setCurrency = function () {
    currency.one = currencyIHave.value
    console.log("this is from set currency")
    console.log(currency.one)
    currency.two = currencyIWant.value
    console.log(currency.two)
}

// setAmount from inputs
const setAmounts = function () {
    currency.amountOne = amountIHave.value
    currency.amountTwo = amountIWant.value
}



// destroy existing chart otherswe graphjs doesn't work
const destroyChart = () => {
    if (currencyChart) {
        currencyChart.destroy();
    }
}

// set exchange rates - updates amount in the dom!
const formatData = (currency, rate1) => {

        //  modifies how dates are displayed on the graph
        const formattedDates = (mydates) => {
            const arrayOfDates = []
            mydates.forEach(date => {
                console.log(date)
                const formattedDate = dayjs(date).format("MMM, D")
                arrayOfDates.push(formattedDate)
    
            })
            return arrayOfDates
        }

    let rates = Object.values(rate1)
    let dates = Object.getOwnPropertyNames(rate1)
    dates = formattedDates(dates)







    const graphRates = rates

    const data = {
        labels: dates,
        datasets: [{
            label:"lalala",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',

            data: graphRates,
        }]
    };

    const graphConfig = {
        type: 'line',
        data,
        options: {}
    };

    console.log(typeof rates)
    console.log(rates)
    //  creates new graph
    currencyChart = new Chart(graphCanvas, graphConfig);



}


export { currency, currencyIHave, currencyIWant, amountIHave, amountIWant, graphCanvas, destroyChart, setCurrency, setAmounts, formatData }