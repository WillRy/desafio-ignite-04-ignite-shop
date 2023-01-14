import { createContext, useMemo, useState } from "react";

interface ProductType {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
    numberPrice: number
}


interface CartContextType {
    products: ProductType[],
    totalInCart: string,
    qtdInCart: number,
    cartIsOpen: boolean,
    addProductToCart: (product: ProductType) => void,
    removeProductFromCart: (index: number) => void,
    toggleCartMenu: () => void,
}
export const CartContext = createContext({} as CartContextType);


interface CartContextProviderProps {
    children: React.ReactNode;
}
export function CartContextProvider({ children }: CartContextProviderProps) {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [cartIsOpen, setCartIsOpen] = useState(false);

    function toggleCartMenu() {
        setCartIsOpen((state) => !state);
    }

    function addProductToCart(product: ProductType) {
        setProducts([...products, product]);
    }

    function removeProductFromCart(index) {
        const newProductList = products.filter((p, i) => i !== index)
        setProducts(newProductList);
    }

    const totalInCart = useMemo(() => {
        const total = products.reduce((prev: number, next: ProductType) => {
            return prev + next.numberPrice;
        }, 0)

        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(total / 100)
    }, [products]);

    const qtdInCart = useMemo(() => {
        return products.length;
    }, [products]);

    return <CartContext.Provider value={{products, addProductToCart, totalInCart, qtdInCart, removeProductFromCart, toggleCartMenu, cartIsOpen}}>{children}</CartContext.Provider>;
}
