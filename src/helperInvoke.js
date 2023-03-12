import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction } from '@solana/web3.js';
import React, { useCallback, useEffect } from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { sanitizeAmount } from './helperFunctions.js';

export const InvokeTransaction = ({ recipientAddress, amount, coinPrices }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { visible, setVisible } = useWalletModal();

  useEffect(() => {
    if (publicKey) {
      invokeTransaction();
    }
  }, [publicKey])

  // Opens the wallet popup to complete the transaction
  const invokeTransaction = useCallback(async () => {
    if (!publicKey) setVisible(!visible);

    // Note: Define new variable instead of updating amount directly because amount is a state variable
    const sanitizedAmount = sanitizeAmount(amount, coinPrices) * 1000000000; // Convert units from lamport to SOL

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientAddress,
        lamports: sanitizedAmount,
      })
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight }
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, { minContextSlot });
    const receipt = await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        console.log('receipt',receipt);
    }, [publicKey, sendTransaction, connection, visible, setVisible, recipientAddress, amount, coinPrices]);

  return (
    <input type="button" onClick={invokeTransaction} value={publicKey ? 'Send' : 'Connect Wallet'} />
  );
};
