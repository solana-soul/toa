import './assets/styles.css';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import PaymentAmountInput from './PaymentAmountInput';
import { sanitizeAmount } from './helperFunctions.js';

function Home({ coinPrices }) {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [showShareables, setShowShareables] = useState(false);
  const { publicKey } = useWallet();

  // Update address to your wallet address if there's a wallet that's connected
  useEffect(() => {
    if (publicKey) {
      setAddress(publicKey.toBase58());
    }
  }, [publicKey])

  // Generate shareable link and embeddable button
  const handleSubmit = e => {
    e.preventDefault();
    if (sanitizeAmount(amount, coinPrices)) {
      setShowShareables(true);
    }
  }

  // Shareable link builder
  const shareableLink = (address, amount) => {
    let link = window.location.origin + window.location.pathname + `pay?to=${address}`;
    if (amount) {
      link = link + `&amt=${amount}`;
    }
    return link;
  }

  return (
    <div className='app'>
      <div className='title'>TOKEN OF APPRECIATION</div>
      <form className='card' onSubmit={handleSubmit}>
        <div className='field'>
          <span className='cardtitle'>Generate your personal Solana payment link and button</span>
        </div>
        <div className='field'>
          <label>Wallet Address</label>
          <input name='address' type='text' placeholder='AbLa...hFzt' value={address} onChange={(e) => setAddress(e.target.value)}required />
        </div>
        <div className='field'>
          <label>Payment Amount (optional)</label>
          <PaymentAmountInput coinPrices={coinPrices} setAmount={setAmount} />
        </div>
        <div className='submitbutton nobottommargin'>
          <input type='submit' value='Generate' />
        </div>
      </form>
      {showShareables && 
        <div className='card fadein'>
          <div className='field'>
            <label>Shareable Link</label>
            <div className='value'><a href={shareableLink(address, amount)} target="_blank" rel="noreferrer">{shareableLink(address, amount)}</a></div>
          </div>
          <div className='field nobottommargin'>
            <label>Embeddable Button Code</label>
            <div><code>&lt;a href="{shareableLink(address, amount)}"&gt;Send a Token of Appreciation&lt;/a&gt; </code></div>
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
