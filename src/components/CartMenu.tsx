import axios from "axios";
import Image from "next/image";
import { X } from "phosphor-react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import {
    CartMenuContainer,
    CartTotal,
    CheckoutButton,
    CloseButton,
    Footer,
    ProductImageContainer,
    ProductItem,
    ProductList,
    ProductQuantity,
} from "../styles/components/cartMenu";
import { ProductDetails } from "../styles/components/cartMenu";

export function CartMenu() {
    const {
        products,
        removeProductFromCart,
        qtdInCart,
        toggleCartMenu,
        totalInCart,
        cartIsOpen,
    } = useContext(CartContext);
    const menu = useRef(null);

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
        useState(false);

    const handleClickOutside = useCallback((event) => {
        if (menu.current && !menu.current.contains(event.target)) {
            toggleCartMenu();
        }
    }, [toggleCartMenu]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [handleClickOutside]);

    function handleRemoveProductFromCart(index) {
        removeProductFromCart(index);
    }

    function handleCloseMenu() {
        toggleCartMenu();
    }

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true);

            const response = await axios.post("/api/checkout", {
                prices: products.map((p) => p.defaultPriceId),
            });

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        } catch (error) {
            setIsCreatingCheckoutSession(false);

            alert("Falha ao redirecionar ao checkout!");
        }
    }

    return (
        <CartMenuContainer ref={menu}>
            <div>
                <CloseButton onClick={handleCloseMenu}>
                    <X size={24} weight="thin" />
                </CloseButton>
            </div>

            <h2>Sacola de compras</h2>

            <ProductList>
                {products.map((product, index) => {
                    return (
                        <ProductItem key={index}>
                            <ProductImageContainer>
                                <Image
                                    src={product.imageUrl}
                                    alt=""
                                    width={96}
                                    height={96}
                                />
                            </ProductImageContainer>
                            <ProductDetails>
                                <h2>{product.name}</h2>
                                <span>{product.price}</span>
                                <button
                                    onClick={() =>
                                        handleRemoveProductFromCart(index)
                                    }
                                >
                                    Remover
                                </button>
                            </ProductDetails>
                        </ProductItem>
                    );
                })}
                {products.length === 0 && <p>Não há produtos</p>}
            </ProductList>
            <Footer>
                <ProductQuantity>
                    <span>Quantidade</span>
                    <span>{qtdInCart} itens</span>
                </ProductQuantity>
                <CartTotal>
                    <span>Valor total</span>
                    <span>{totalInCart}</span>
                </CartTotal>
                <CheckoutButton
                    disabled={isCreatingCheckoutSession}
                    onClick={handleBuyProduct}
                >
                    Finalizar compra
                </CheckoutButton>
            </Footer>
        </CartMenuContainer>
    );
}
