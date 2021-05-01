import {currency} from "./currency"

const api_key = "86dbfb355c434a4f3f0b"


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
    return {currencies: ex1Upper, rates: responseData[ex1.toUpperCase()], ratesReverse: responseData[ex2.toUpperCase()] }
    // console.log("this is from get current rates")
    // console.log(response)
    // console.log(responseData)
    // console.log(ex1Upper)
    // console.log(responseData[ex1Upper])
    // console.log(responseData[ex2.toUpperCase()])

    // return {rateOne:responseData[ex1.toUpperCase()], rateTwo: responseData[ex2.toUpperCase()] }
    // return {rateOne: }
}

// set rates in the object
const setRates = function(one,two) {
//    let response =  await getCurrentRates()
    currency.rateOne =  one 
    currency.rateTwo =  two
    console.log("this is from set rates")
    // console.log(currency.rateTwo)

}

export {getCurrentRates, setRates}