const axios = require('axios');
const money = require('money');

const RATES_URL = 'https://api.exchangeratesapi.io/latest';
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker';
const CURRENCY_BITCOIN = 'BTC';

const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN); //we check if CURRENCY_BITCOIN is in the array

module.exports = async opts => {
  const {amount = 1, from = 'USD', to = CURRENCY_BITCOIN} = opts; //we set the  default parameters
  const promises = [];
  let base = from;

  const anyBTC = isAnyBTC(from, to);

  if (anyBTC) { //if CURRENCY_BITCOIN is a "from" or "to" currency (of one of the currencies searched)
    base = from === CURRENCY_BITCOIN ? to : from; // we define the "base" as the correct "to" or "from" currency
    promises.push(axios(BLOCKCHAIN_URL));
  }

  promises.unshift(axios(`${RATES_URL}?base=${base}`)); //we add the exhange rates from the base currency (to all other currencies) in the promises array
  // we do this by querying the rates_url api

  try {
    const responses = await Promise.all(promises); //we wait for all the promises to be fullfilled
    const [rates] = responses;

    money.base = rates.data.base; //we store the base and rates in the parameters of the money module 
    money.rates = rates.data.rates;

    const conversionOpts = {
      from,
      to
    };

    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
      );

      Object.assign(money.rates, { //we change the money rates
        'BTC': blockchain.data[base].last
      });
    }

    if (anyBTC) {
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }

    /**
    * Convert the money in the desired currency
    * @param {float} amount - the amount of money to be converted
    * @param {Object} conversionOpts - the format of this object is{from: "XXX", to: "YYY"} where XXX end YYY are the currencies desired
    * @return float
     */
    return money.convert(amount, conversionOpts);
  } catch (error) {
    throw new Error (
      '💵 Please specify a valid `from` and/or `to` currency value!'
    );
  }
};
