import "./Button.scss";
import classNames from "classnames";
import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    size?: "small";
    kind: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: "button" | "submit" | "reset";
    title?: string;
    iconOnly?: boolean;
};

function Button(props: ButtonProps) {

    const classes = classNames({
        "seta__button": true,
        "seta__button--sm": props.size === "small",
        "seta__button--primary": props.kind === "primary",
        "seta__button--secondary": props.kind === "secondary",
        "seta__button--tertiary": props.kind === "tertiary",
        "seta__button--icon-only": props.iconOnly,
    });

    return (
        <button type={props.type} className={classes} onClick={props.onClick} title={props.title} disabled={props.disabled}>
            {props.children}
        </button>
    );
}

export default Button;