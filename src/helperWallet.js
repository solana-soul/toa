import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { CoinbaseWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter,SolflareWalletAdapter, TorusWalletAdapter, BackpackWalletAdapter } from
"@solana/wallet-adapter-wallets";
import { clusterApiUrl } from '@solana/web3.js';
require('@solana/wallet-adapter-react-ui/styles.css');

export const Wallet = ({ children }) => {
    // const endpoint = useMemo(() => "https://api.devnet.solana.com", []); // devnet
    const endpoint = useMemo(() => "https://rpc.ankr.com/solana", []); // mainnet
    const wallets = useMemo(
        () => [
             new PhantomWalletAdapter(),
             new CoinbaseWalletAdapter(),
             new SlopeWalletAdapter(),
             new BackpackWalletAdapter(),
             new SolflareWalletAdapter(),
             new TorusWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
