import {graphCanvas, exchangeRate, amountIWant, amountIHave} from "./selectors"

let dayjs = require('dayjs')
import Chart from 'chart.js/auto';

let currencyChart

//  class for storing data that comes back from api 
class Data  {
    constructor(_currencies, _data) {
        this.currencies = _currencies;
        this.data =_data;
        this.rateToday = null;
        this.rates = [];
        this.dates = [];
    }
    format() {
        this.rates = Object.values(this.data)
        this.rateToday = this.rates[0]
        let dates = Object.getOwnPropertyNames(this.data)
        dates.forEach(date => {
            const formattedDate = dayjs(date).format("MMM, D")
            this.dates.push(formattedDate)

        })

    }
    displayRate() {
        exchangeRate.innerText = this.rateToday
        amountIWant.value = amountIHave.value * this.rateToday.toFixed(2)
    }
    displayGraph() {
        const graphRates = this.rates
        const graphDates = this.dates

        const data = {
            labels: graphDates,
            datasets: [{
                label: "lalala",
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
        currencyChart = new Chart(graphCanvas, graphConfig);

    }
    calculate(amount) {

let number = amount*this.rateToday
return number.toFixed(2)
    }

}

// destroy existing chart otherswe graphjs doesn't work
const destroyChart = () => {
    if (currencyChart) {
        currencyChart.destroy();
    }
}


export {destroyChart, currencyChart, Data}