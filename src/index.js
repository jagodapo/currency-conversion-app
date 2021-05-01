import {currency, currencyIHave, currencyIWant, amountIHave, amountIWant, setCurrency, setAmounts, setExchangeRate} from "./currency"
import {getCurrentRates, setRates} from "./get"

// test - wyrzuc pozniej
console.log(currency.one)
console.log(currency.two)

const UpdateDisplay = async () => {
   await setCurrency()
const response = await getCurrentRates()
setRates(response.rateOne, response.rateTwo)
setExchangeRate()

}
currencyIHave.addEventListener("change", UpdateDisplay)
currencyIWant.addEventListener("change", UpdateDisplay)


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
