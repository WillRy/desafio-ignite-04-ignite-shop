import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";
import { CartContext, CartContextProvider } from "../contexts/CartContext";
import { Header } from "../components/Header";

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

globalStyles();
export default function App({ Component, pageProps }: AppProps) {
    return (
        <Container>
            <CartContextProvider>
                <Header/>
                <Component {...pageProps} />
            </CartContextProvider>
            <ToastContainer />
        </Container>
    );
}
