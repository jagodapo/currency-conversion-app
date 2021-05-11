// all selectors in the app
// const currencyIHave = document.querySelector("#currency-one")
const cIHave = document.getElementsByName('currency-one');
const cIWant = document.getElementsByName('currency-two');


// const currencyIWant = document.querySelector("#currency-two")
const amountIHave = document.querySelector("#amount-i-have")
const amountIWant = document.querySelector("#amount-i-want")
const exchangeRate = document.querySelector("#exchange-rate")
const graphCanvas = document.querySelector("#currency-graph")
const reverseButton = document.querySelector("#reverse-button")

//currencies avaliable in the dropdowns
const listOfCurrencies = ["EUR", "CHF", "AUD", "GBP", "JPY", "USD"]


export {amountIHave, amountIWant, graphCanvas, exchangeRate,listOfCurrencies, reverseButton, cIHave, cIWant}