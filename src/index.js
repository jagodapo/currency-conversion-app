
import "./style.scss"
import { destroyChart, Data } from "./currency"
import { currency, getCurrentRates} from "./get"
import { cIHave, cIWant, currencyIWant, amountIHave, amountIWant, reverseButton, cYouNeed } from "./selectors"
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

// selecting currency user wants
const cIHaveArray = Array.from(cIHave)
cIHaveArray.forEach((c)=> c.addEventListener("change", (e) => {
   if (e.target.checked === true) {
      currency.one = e.target.value
      UpdateDisplay()
   }

}))

// selecting currency user needs
const cIWantArray = Array.from(cIWant)
cIWantArray.forEach((c)=> c.addEventListener("change", (e) => {
   if (e.target.checked === true) {
      currency.two = e.target.value
      UpdateDisplay()
   }

}))

// calculating the amount
amountIHave.addEventListener("input", (e) => {
let number = dataReceived[0].calculate(e.target.value)
amountIWant.value = number
})
amountIWant.addEventListener("input", (e) => {
let number = dataReceived[1].calculate(e.target.value)
amountIHave.value = number
})

// reversing order of the objects in the array and displaying correct data
reverseButton.addEventListener("click", () => {



// tu jest problem
   cIWantArray.forEach(c => c.value == currency.one? c.checked === "checked" : c.checked === "unchecked")
  


  let temp = currency.one
  currency.one = currency.two
  currency.two = temp

  dataReceived.reverse()
  destroyChart()
  dataReceived[0].displayGraph()
  dataReceived[0].displayRate()
})


// onpageload
currency.setDates()
currency.setInitialCurrency()
UpdateDisplay()
