import Image from "next/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import { useContext, useState } from "react";
import logoImage from "../assets/logo.svg";
import { CartContext } from "../contexts/CartContext";
import { CartButton, HeaderContainer } from "../styles/components/header";
import { CartMenu } from "./CartMenu";

export function Header() {
    const { qtdInCart, cartIsOpen, toggleCartMenu } = useContext(CartContext);

    function handleCartOpen() {
        toggleCartMenu();
    }

    return (
        <HeaderContainer>
            <Link href={'/'}>
                <Image src={logoImage} alt="" />
            </Link>
            <CartButton onClick={handleCartOpen}>
                <Handbag size={24} weight="thin" />
                {qtdInCart > 0 && <span>{qtdInCart}</span>}
            </CartButton>
            {cartIsOpen && <CartMenu />}
        </HeaderContainer>
    );
}
