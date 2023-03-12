import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Pay from './Pay';
import { Wallet } from './helperWallet.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Toaster } from 'react-hot-toast';

function App() {
  // How much these tokens are in USD
  const [coinPrices, setCoinPrices] = useState();

  useEffect(() => {
    fetchCoinPrices();
  }, [])

  const fetchCoinPrices = () => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana%2Cbitcoin&vs_currencies=usd")
      .then(res => res.json())
      .then(
        (res) => {
          setCoinPrices({
            sol: res.solana.usd,
            btc: res.bitcoin.usd,
          });
        },
        (error) => {
          // Update fallbacks when prices change
          setCoinPrices({
            sol: 15,
            btc: 16000,
          });
        }
      );
  }

  return (
    <>
      <Wallet>
        <div className='walletwrapper'>
          <WalletMultiButton />
        </div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home coinPrices={coinPrices} />} />
            <Route path="pay" element={<Pay coinPrices={coinPrices} />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </BrowserRouter>
      </Wallet>
      <Toaster/>
    </>
  );
}

export default App;
