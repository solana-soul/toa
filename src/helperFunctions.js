import { ReactComponent as Hotdog } from './assets/icons/hotdog.svg';
import { ReactComponent as Coffee } from './assets/icons/coffee.svg';
import { ReactComponent as Pizza } from './assets/icons/pizza.svg';
import { ReactComponent as Sushi } from './assets/icons/nigiri.svg';
import { ReactComponent as Bitcoin } from './assets/icons/bitcoin.svg';
import toast from 'react-hot-toast';

export const ITEMS = {
  HOTDOG: 'hotdog',
  COFFEE: 'coffee',
  PIZZA: 'pizza',
  SUSHI: 'sushi',
  BITCOIN: 'bitcoin',
}

export const getItemPrice = (item, coinPrices) => {
  const solPrice = coinPrices.sol;
  const btcPrice = coinPrices.btc;

  const roundToDecimal = (num, decimal) => (
    Math.round(num * 10**decimal) / 10**decimal
  );

  switch(item) {
    case ITEMS.HOTDOG:
      return roundToDecimal(1.5 / solPrice, 1);
    case ITEMS.COFFEE:
      return roundToDecimal(5 / solPrice, 1);
    case ITEMS.PIZZA:
      return roundToDecimal(15 / solPrice, 0);
    case ITEMS.SUSHI:
      return roundToDecimal(50 / solPrice, 0);
    case ITEMS.BITCOIN:
      return roundToDecimal(btcPrice / solPrice, 0);
    default:
      return 0;
  }
}

export const getItemIcon = (item) => {
  switch(item) {
    case ITEMS.HOTDOG:
      return <Hotdog />;
    case ITEMS.COFFEE:
      return <Coffee />;
    case ITEMS.PIZZA:
      return <Pizza />;
    case ITEMS.SUSHI:
      return <Sushi />;
    case ITEMS.BITCOIN:
      return <Bitcoin />;
    default:
      return <></>;
  }
}

// Replace dashes with spaces
export const getItemString = (item) => {
  switch(item) {
    case ITEMS.HOTDOG:
      return 'costco hot dog';
    case ITEMS.COFFEE:
      return 'bougie coffee';
    case ITEMS.PIZZA:
      return 'whole pizza';
    case ITEMS.SUSHI:
      return 'fancy sushi set';
    case ITEMS.BITCOIN:
      return 'bitcoin';
    default:
      return <></>;
  }
}

// Possible inputs:
// 1. Number of SOL (e.g. 10)
// 2. String number of SOL (e.g. '10')
// 3. One of ITEMs (e.g. 'pizza')
export const sanitizeAmount = (amount, coinPrices) => {
  if (!amount) {
    toast('Please specify a payment amount');
    return;
  }

  // Convert string number to number
  if (!isNaN(amount)) {
    amount = +amount;
  }

  if (typeof amount == 'number') {
    if (amount < 0.01) {
      toast('Payment amount must be at least 0.01 SOL');
      return;
    }
  }

  if (typeof amount == 'string') {
    if (amount in ITEMS) {
      toast('Invalid amount');
      return;
    }
    amount = getItemPrice(amount, coinPrices);
  }
  return amount;
}

// Checks if a string is a number (e.g. '12')
export const isNumeric = (str) => {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

// Capitalize first letter of string
export const titlecase = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}
