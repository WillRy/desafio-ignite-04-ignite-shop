import { HomeContainer, Product } from "../styles/pages/home";

import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Head from "next/head";
import {Handbag} from 'phosphor-react'
import { useContext } from "react";
import { CartContext, CartContextProvider } from "../contexts/CartContext";
import { toast } from "react-toastify";

interface HomeProps {
    products: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        defaultPriceId: string;
        numberPrice: number
    }[];
}
export default function Home({ products }: HomeProps) {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48,
        },
    });

    const {addProductToCart} = useContext(CartContext);


    function handleAddProductToCart(e, product) {
        console.log(e, product)
        e.stopPropagation();
        e.preventDefault();

        addProductToCart(product);

        toast("Produto adicionado no carrinho!", {type: 'success', toastId: 'added'});
    }

    return (
        <>
            <Head>
                <title>Ignite Shop</title>
            </Head>
            <HomeContainer ref={sliderRef} className={"keen-slider"}>
                {products.map((product) => {
                    return (
                        <Product
                            key={product.id}
                            href={`/product/${product.id}`}
                            className={"keen-slider__slide"}
                            prefetch={false}
                        >
                            <Image
                                src={product.imageUrl}
                                width={520}
                                height={480}
                                alt=""
                            />
                            <footer>
                                <div>
                                    <strong>{product.name}</strong>
                                    <span>{product.price}</span>
                                </div>
                                <button onClick={(e) => handleAddProductToCart(e, product)}>
                                    <Handbag size={32} weight="thin" />
                                </button>

                            </footer>
                        </Product>
                    );
                })}
            </HomeContainer>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ["data.default_price"],
    });

    const products = response.data.map((product) => {
        const price = product.default_price as Stripe.Price;

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(price.unit_amount / 100),
            numberPrice: price.unit_amount,
            defaultPriceId: price.id,
        };
    });
    return {
        props: {
            products,
        },
        revalidate: 60 * 60 * 2, // 2 horas
    };
};
