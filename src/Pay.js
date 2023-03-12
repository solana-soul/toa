import './assets/styles.css';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InvokeTransaction } from './helperInvoke.js';
import PaymentAmountInput from './PaymentAmountInput';
import { getItemIcon, getItemPrice, isNumeric, titlecase } from './helperFunctions.js';

function Pay({ coinPrices }) {
  const [amount, setAmount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const addressFromParams = searchParams.get('to');

  // The url param is a string that can be '12' or 'pizza', we shall convert the former to a regular number to make life easier
  const amountFromParamsString = searchParams.get('amt');
  const amountFromParams = isNumeric(amountFromParamsString) ? +amountFromParamsString : amountFromParamsString;

  const renderSendingAmount = (amountFromParams, coinPrices) => {
    if (typeof amountFromParams == 'number') {
      return (
        <div className='value'>{amountFromParams} SOL</div>
      );
    } else if (typeof amountFromParams == 'string') {
      return (
        <div className='flexbox sendingamount value'>{getItemIcon(amountFromParams)} {titlecase(amountFromParams)} ({getItemPrice(amountFromParams, coinPrices)} SOL)</div>
      );
    }
  }

  return (
    <div className='app'>
      <div className='title'>TOKEN OF APPRECIATION</div>
      <form className='card'>
        <div className='field'>
          <span className='cardtitle'>Send a payment with Solana</span>
        </div>
        <div className='field'>
          <label>Recipient Address</label>
          <div className='value'>{addressFromParams}</div>
        </div>
        <div className='field'>
          <label>Payment Amount</label>
          {amountFromParams ?
            coinPrices && renderSendingAmount(amountFromParams, coinPrices) :
            <PaymentAmountInput coinPrices={coinPrices} setAmount={setAmount} />
          }
        </div>
        <div className='submitbutton nobottommargin'>
          <InvokeTransaction
            recipientAddress={addressFromParams}
            amount={amountFromParams ?? amount}
            coinPrices={coinPrices}
          />
        </div>
      </form>
    </div>
  );
}

export default Pay;
