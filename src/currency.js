import {graphCanvas, exchangeRate, amountIWant, amountIHave} from "./selectors"

let dayjs = require('dayjs')
import Chart from 'chart.js/auto';


Chart.defaults.font.family = 'Titillium Web';
Chart.defaults.font.size = 16;
Chart.defaults.font.color = 'rgba(49, 21, 162, 1)'

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
        const result = amountIHave.value * this.rateToday
        amountIWant.value = result.toFixed(2)
    }
    displayGraph() {
        const graphRates = this.rates
        const graphDates = this.dates

        const data = {
            labels: graphDates,
            font: {
                family: "'Titillium Web', sans-serif",
                size: 14,
                color: 'rgba(49, 21, 162, 1)'
            },

            datasets: [{
                label: this.currencies.replace("_", " to "),
                backgroundColor: 'rgba(49, 21, 162, 1)',
                borderColor: 'rgba(49, 21, 162, 1)',

                data: graphRates,
            }]
        };
    
        const graphConfig = {
            type: 'line',
            data,
            options: {
                legend: {
                    labels: {
                        family: "'Titillium Web', sans-serif",
                        fontColor: "rgba(49, 21, 162, 1)",
                        fontSize: 18
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            family: "'Titillium Web', sans-serif",
                            fontColor: "rgba(49, 21, 162, 1)",
                            fontSize: 18,
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            family: "'Titillium Web', sans-serif",
                            fontColor: "rgba(49, 21, 162, 1)",
                            fontSize: 14,
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }]
                }
            }
        };

            window.currencyChart  = new Chart(graphCanvas, graphConfig)

    }
    calculate(amount) {

let number = amount*this.rateToday
return number.toFixed(2)
    }

}

// destroy existing chart otherswe graphjs doesn't work
const destroyChart = () => {
    if (window.currencyChart) {
        window.currencyChart.destroy();
    }
}


export {destroyChart,  Data}