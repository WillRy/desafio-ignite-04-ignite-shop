import { styled } from "..";

export const HeaderContainer = styled("header", {
    padding: "2rem 0",
    width: "100%",
    maxWidth: 1180,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

export const CartButton = styled('button',{
    display: "flex",
    alignItems: "center",
    padding: "12px",
    width: "48px",
    height: "48px",

    background: "$gray800",
    borderRadius: "6px",
    border: 0,
    cursor: "pointer",
    position: 'relative',


    "&:hover": {
        filter: "brightness(1.2)",
    },

    svg: {
        color: "#fff",
    },

    span: {
        fontWeight: 'bold',
        color: '$white',
        fontSize: '$sm',

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        background: "$green500",
        borderRadius: "50%",
        position: "absolute",
        right: -7,
        top: -7,
        border: " 3px solid #121214",
    },
});
