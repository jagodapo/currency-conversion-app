import {currencyIHave, currencyIWant} from "./selectors"
const api_key = "86dbfb355c434a4f3f0b"

let dayjs = require('dayjs')

// object storing variables for api requests
const currency = {
    one: currencyIHave.value,
    two: currencyIWant.value,
    dateNow: null,
    dateThen: null,
    setDates: function () {
        currency.dateNow = dayjs().format("YYYY-MM-DD")
        currency.dateThen = dayjs().subtract(7, 'day').format("YYYY-MM-DD")
    },
    setCurrency: function() {
        currency.one = currencyIHave.value
        currency.two = currencyIWant.value
    }
}
 

// fetches data from api
async function getCurrentRates() {
    console.log("from get current rates")
    const api_url = `https://free.currconv.com/api/v7/convert?q=${currency.one}_${currency.two},${currency.two}_${currency.one}&compact=ultra&date=${currency.dateThen}&endDate=${currency.dateNow}&apiKey=${api_key}`
    const ex1 = `${currency.one}_${currency.two}`
    const ex2 = `${currency.two}_${currency.one}`
    const ex1Upper = ex1.toUpperCase()
    const ex2Upper = ex2.toUpperCase()
    const response =  await fetch(api_url)
    const responseData = await response.json()
    console.log(responseData)
    return {
        currencies: ex1Upper, 
        currenciesReversed:ex2Upper,  
        rates: responseData[ex1.toUpperCase()], 
        ratesReversed: responseData[ex2.toUpperCase()] }

}

export {currency, getCurrentRates}