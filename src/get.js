import { cIHave, cIWant } from "./selectors";

const api_key = "4eaa38357e7a4612944d76ce735a5076";

let dayjs = require("dayjs");

// object storing variables for api requests
const currency = {
  //
  one: null,
  two: null,
  dateNow: null,
  dateThen: null,
  setDates: function () {
    currency.dateNow = dayjs().format("YYYY-MM-DD");
    currency.dateThen = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  },
  setInitialCurrency: function () {
    const cIHaveArray = Array.from(cIHave);
    const tempOne = cIHaveArray.find((c) => c.checked === true);
    currency.one = tempOne.value;

    const cIWantArray = Array.from(cIWant);
    const tempTwo = cIWantArray.find((c) => c.checked === true);
    currency.two = tempTwo.value;
  },
  setCurrency: function () {
    // currency.one = tempTwo
    currency.two = currencyIWant.value;
  },
};

// fetches data from api
async function getCurrentRates() {
  const api_url = `https://free.currconv.com/api/v7/convert?q=${currency.one}_${currency.two},${currency.two}_${currency.one}&compact=ultra&date=${currency.dateThen}&endDate=${currency.dateNow}&apiKey=${api_key}`;

  const ex1 = `${currency.one}_${currency.two}`;
  const ex2 = `${currency.two}_${currency.one}`;
  const ex1Upper = ex1.toUpperCase();
  const ex2Upper = ex2.toUpperCase();
  const response = await fetch(api_url);
  const responseData = await response.json();

  return {
    currencies: ex1Upper,
    currenciesReversed: ex2Upper,
    rates: responseData[ex1.toUpperCase()],
    ratesReversed: responseData[ex2.toUpperCase()],
  };
}

export { currency, getCurrentRates };
