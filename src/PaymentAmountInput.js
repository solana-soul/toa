import './assets/styles.css';
import { ReactComponent as Hotdog } from './assets/icons/hotdog.svg';
import { ReactComponent as Coffee } from './assets/icons/coffee.svg';
import { ReactComponent as Pizza } from './assets/icons/pizza.svg';
import { ReactComponent as Sushi } from './assets/icons/nigiri.svg';
import { ReactComponent as Bitcoin } from './assets/icons/bitcoin.svg';
import { useState } from 'react';
import { getItemPrice, ITEMS, getItemString } from './helperFunctions.js';

function PaymentAmountInput({ coinPrices, setAmount }) {
  const [selectedItem, setSelectedItem] = useState();

  const selectItem = (item) => {
    setSelectedItem(item);
    setAmount(item);
  }

  const renderItemButton = (item, icon) => (
    <button type='button' onClick={() => selectItem(item)} className={selectedItem === item ? 'selected' : undefined}>
      {icon}
    </button>
  )

  return (
    <>
      <div className="flexbox">
        <div className='paymenticons flex70'>
          {renderItemButton(ITEMS.HOTDOG, <Hotdog />)}
          {renderItemButton(ITEMS.COFFEE, <Coffee />)}
          {renderItemButton(ITEMS.PIZZA, <Pizza />)}
          {renderItemButton(ITEMS.SUSHI, <Sushi />)}
          {renderItemButton(ITEMS.BITCOIN, <Bitcoin />)}
        </div>
        <div className="paymentinput flex30">
          <input
            name='amount'
            type='number'
            step='0.01'
            placeholder='Custom amount in SOL'
            onClick={(e) => setSelectedItem()}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      {selectedItem && coinPrices &&
        <div className="subcaption">A {getItemString(selectedItem)} ({getItemPrice(selectedItem, coinPrices)} SOL)</div>
      }
    </>
  );
}

export default PaymentAmountInput;
