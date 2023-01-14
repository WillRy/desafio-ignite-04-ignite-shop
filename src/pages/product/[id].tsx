import Image from "next/image";
import { useRouter } from "next/router";
import {
    ImageContainer,
    ProductContainer,
    ProductDetails,
} from "../../styles/pages/product";
import camiseta1 from "../../assets/camisetas/1.png";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import axios from "axios";
import { useContext, useState } from "react";
import Head from "next/head";
import { CartContext } from "../../contexts/CartContext";
import { toast } from "react-toastify";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPriceId: string;
        numberPrice: number
    };
}
export default function Product({ product }: ProductProps) {

    const { addProductToCart } = useContext(CartContext);

    function handleAddProductToCart() {
        addProductToCart(product);
        toast("Produto adicionado no carrinho!", {type: 'success', toastId: 'added'});
    }



    return (
        <>
            <Head>
                <title>{`${product.name} : Ignite Shop`}</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image
                        src={product.imageUrl}
                        alt=""
                        width={520}
                        height={480}
                        v-if={product.imageUrl}
                    />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>
                    <p>{product.description}</p>

                    <button
                        onClick={handleAddProductToCart}
                    >
                        Comprar agora
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
    params,
}) => {
    const productId = params.id;
    const product = await stripe.products.retrieve(productId, {
        expand: ["default_price"],
    });

    const price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id,
                numberPrice: price.unit_amount
            },
        },
        revalidate: 60 * 60 * 1, // 1 hora
    };
};
