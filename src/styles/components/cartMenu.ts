import { styled } from "..";

export const CartMenuContainer = styled("div", {
    boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",
    background: "$gray800",
    width: 480,
    zIndex: 999,

    display: 'flex',
    flexDirection: 'column',

    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,

    padding: "24px 24px 24px 48px",


    h2: {
        fontWeight: "bold",
        fontSize: "$lg",
        lineHeight: 1.6,
        color: "$gray100",
        marginBottom: "32px",
    },
});

export const CloseButton = styled("button", {
    position: 'relative',
    left: 'calc(100% - 24px)',
    border: 0,
    background: "transparent",
    marginBottom: 24,
    marginLeft: "auto",
    cursor: 'pointer',

    svg: {
        color: "$grayIcon",
    },
});

export const ProductList = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
});

export const ProductItem = styled("div", {
    display: "flex",
    gap: "20px",
});

export const ProductImageContainer = styled("div", {
    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
});

export const ProductDetails = styled("div", {

    h2: {
        fontSize: "$md",
        fontWeight: "normal",
        lineHeight: 1.6,
        color: "$gray300",
        margin: 0,
    },
    span: {
        fontSize: "$md",
        fontWeight: "bold",
        lineHeight: 1.6,
        color: "$gray100",
        marginBottom: 8,
        display: 'inline-block'
    },

    button: {
        border: 0,
        background: 'transparent',
        fontWeight: 'bold',
        fontSize: '1rem',
        lineHeight: '1.6',
        color: '$green500',
        cursor: 'pointer',
        padding: 0,
        display: 'block',
        marginTop: 'auto',
        '&:hover': {
            color: '$green300'
        }
    }
});

export const Footer = styled('div', {
    marginTop: 'auto'
});

export const ProductQuantity = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: 1.6,
    marginBottom: 8,
})

export const CartTotal = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    lineHeight: 1.4,
    fontSize: '$xl',
    marginBottom: 58
})

export const CheckoutButton = styled('button', {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    width: '100%',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    }
  })
