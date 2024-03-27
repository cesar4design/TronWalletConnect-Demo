import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { WalletError } from '@tronweb3/tronwallet-abstract-adapter';
import { WalletDisconnectedError, WalletNotFoundError } from '@tronweb3/tronwallet-abstract-adapter';
// @ts-ignore
import { toast } from 'react-hot-toast';
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapter-tronlink'
import { useMemo } from 'react';
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';

export default function App({ Component, pageProps }: AppProps) {
    function onError(e: WalletError) {
        if (e instanceof WalletNotFoundError) {
            toast.error(e.message);
        } else if (e instanceof WalletDisconnectedError) {
            toast.error(e.message);
        } else toast.error(e.message);
    }
    const adapters = useMemo(function () {
        const tronLinkAdapter = new TronLinkAdapter();
        return [tronLinkAdapter];
    }, []);

    /**
     * wrap your app content with WalletProvider and WalletModalProvider
     * WalletProvider provide some useful properties and methods
     * WalletModalProvider provide a Modal in which you can select wallet you want use.
     *
     * Also you can provide a onError callback to process any error such as ConnectionError
     */
    return (
        <WalletProvider onError={onError} adapters={adapters} disableAutoConnectOnLoad={true}>
            <WalletModalProvider>
                <Component {...pageProps} />
            </WalletModalProvider>
        </WalletProvider>
    );
}
