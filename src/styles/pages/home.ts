import Link from "next/link";
import { styled } from "..";

export const HomeContainer = styled("main", {
    display: "flex",
    // gap: "3rem",
    width: "100%",
    //1180+((largura da tela - 1180) / 2)
    maxWidth: "calc(100vw - ( (100vw - 1180px) / 2) )",
    marginLeft: "auto",
    minHeight: 656,

});

export const Product = styled(Link, {
    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
    borderRadius: 8,
    // padding: "0.25rem",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    img: {
        objectFit: "cover",
    },
    footer: {
        position: "absolute",
        bottom: "0.25rem",
        left: "0.25rem",
        right: "0.25rem",
        padding: "2rem",

        borderRadius: 4,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: "rgba(0,0,0,0.6)",

        transform: "translateY(110%)",
        opacity: "0",
        transition: "all 0.2s ease-in-out",

        div: {
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.4
        },

        strong: {
            fontSize: "$lg",
            color: '$gray100',
        },

        span: {
            fontSize: "$xl",
            fontWeight: "bold",
            color: "$green300",
        },

        button: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            width: '56px',
            height: '56px',


            background: '$green500',
            borderRadius: '6px',
            border: 0,
            cursor: 'pointer',

            '&:hover': {
                backgroundColor: '$green300',
            },

            svg: {
                color: '#fff'
            }
        }
    },

    "&:hover": {
        footer: {
            transform: "translateY(0%)",
            opacity: "1",
        },
    },
});
