import {currency, currencyIHave, currencyIWant, amountIHave, amountIWant, graphCanvas, destroyChart, setCurrency, setAmounts, formatData} from "./currency"
import {getCurrentRates, setRates} from "./get"
import Chart from 'chart.js/auto';


let dayjs = require('dayjs')
// graph setup





// setDates for api request
const setDates = () => {
   currency.dateNow = dayjs().format("YYYY-MM-DD")
   currency.dateThen = dayjs().subtract(7, 'day').format("YYYY-MM-DD")
   console.log(currency.dateNow)
   console.log(currency.dateThen)
}




const UpdateDisplay = async () => {
   await setCurrency()
const response = await getCurrentRates()
// setRates(response.rateOne, response.rateTwo)
await destroyChart()
formatData(response.currencies, response.rates)


}
currencyIHave.addEventListener("change", UpdateDisplay)
currencyIWant.addEventListener("change", UpdateDisplay)


// onpageload APP STARTS HERE - refactor the rest
amountIHave.value = 1
amountIWant.value = 1
setDates()
// UpdateDisplay()

// GRAPH ON LOAD




// currencyIHave.onchange = () => {
// setCurrency()
// getCurrentRates()
// setRates()

// }

// currencyIWant.onchange = async () => {
// setCurrency()
// await getCurrentRates()
// setRates()


// }

// onpageload
amountIHave.value = 1
amountIWant.value = 1

UpdateDisplay()


// test - wyrzuc pozniej
console.log(currency.one)
console.log(currency.two)
