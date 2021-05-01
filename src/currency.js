
// set currencies
const currencyIHave = document.querySelector("#currency-one")
const currencyIWant = document.querySelector("#currency-two")
const amountIHave = document.querySelector("#amount-i-have")
const amountIWant = document.querySelector("#amount-i-want")
const exchangeRate = document.querySelector("#exchange-rate")


const currency = {
    all: ["EUR", "CHF", "AUD", "GBP", "JPY", "USD"],
    one: currencyIHave.value,
    two: currencyIWant.value,
    rateOne: 1,
    rateTwo: 2,
    amountOne: null,
    amountTwo: null,
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
const setAmounts = function() {
currency.amountOne = amountIHave.value
currency.amountTwo = amountIWant.value
}



// set exchange rates - updates amount in the dom!
const setExchangeRate = () => {
    exchangeRate.innerText = currency.rateOne
}


export {currency, currencyIHave, currencyIWant, amountIHave, amountIWant, setCurrency, setAmounts, setExchangeRate}