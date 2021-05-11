// import 'materialize-css/dist/js/materialize.min.js'
// import 'materialize-css/dist/css/materialize.min.css'
import "./style.scss"
import {currencyChart, destroyChart, Data } from "./currency"
import { currency, getCurrentRates} from "./get"
import { cIHave, cIwant, currencyIWant, amountIHave, amountIWant, reverseButton, cYouNeed } from "./selectors"
import Chart from 'chart.js/auto';


let dayjs = require('dayjs')
// graph setup

const dataReceived = []

const UpdateDisplay = async () => {
   // await currency.setCurrency()
   const response = await getCurrentRates()
   console.log(response)

   // creates two objects from data coming back from api eg: for USD_AUD and AUD_USD dates and rates
   let data = new Data(response.currencies, response.rates)
   let reverse = new Data(response.currenciesReversed, response.ratesReversed)
   dataReceived.length = 0 
   dataReceived.push(data)
   dataReceived.push(reverse)
   dataReceived.forEach(dataFromApi => {
      dataFromApi.format()
   })
   // clears the old chart otherwise new one won't display
   await destroyChart()
   dataReceived[0].displayGraph()
   dataReceived[0].displayRate()
}
// currencyIHave.addEventListener("change", UpdateDisplay)
// currencyIWant.addEventListener("change", UpdateDisplay)
amountIHave.addEventListener("input", (e) => {
let number = dataReceived[0].calculate(e.target.value)
amountIWant.value = number
})
amountIWant.addEventListener("input", (e) => {
let number = dataReceived[1].calculate(e.target.value)
amountIHave.value = number
})

reverseButton.addEventListener("click", () => {
  let temp = currency.one
  currency.one = currency.two
  currency.two = temp
  dataReceived.reverse()
  destroyChart()
  dataReceived[0].displayGraph()
  dataReceived[0].displayRate()
})


// onpageload APP STARTS HERE - refactor the rest
// currency.setInitial()
currency.setDates()
currency.setInitialCurrency()
UpdateDisplay()
