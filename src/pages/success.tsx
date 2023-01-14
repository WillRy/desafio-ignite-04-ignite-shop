import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import {
    SuccessContainer,
    ImageContainer,
    ProductList,
} from "../styles/pages/success";

interface SuccessProps {
    costumerName: string;
    products: {
        name: string;
        imageUrl: string;
    }[];
}

export default function Success({ costumerName, products }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>


                <ProductList>
                    {products.map((product, index) => {
                        return (
                            <ImageContainer key={index}>
                                <Image
                                    src={product.imageUrl}
                                    width={120}
                                    height={110}
                                    alt=""
                                />
                            </ImageContainer>
                        );
                    })}
                </ProductList>

                <h1>Compra efetuada</h1>

                <p>
                    Uhuul <strong>{costumerName}</strong>, sua compra de{" "}
                    {products.length} já está a caminho da sua casa.
                </p>

                <Link href="/">Voltar ao catálogo</Link>
            </SuccessContainer>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const sessionId = String(query.session_id);

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "line_items.data.price.product"],
    });

    const costumerName = session.customer_details.name;

    console.log(session.line_items.data[0].price.product);

    const products: Stripe.Product[] = session.line_items.data.map((item) => {
        const product = item.price.product as Stripe.Product;
        return { ...product, imageUrl: product.images[0] };
    });

    return {
        props: {
            costumerName,
            products: products,
        },
    };
};
