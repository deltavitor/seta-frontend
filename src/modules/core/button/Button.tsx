import "./Button.scss";
import classNames from "classnames";
import React from "react";

type ButtonProps = {
    label: String;
    kind: "primary" | "secondary";
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: "button" | "submit" | "reset";
};

function Button(props: ButtonProps) {

    const classes = classNames({
        "seta__button": true,
        "seta__button--primary": props.kind === "primary",
        "seta__button--secondary": props.kind === "secondary",
    });

    return (
        <button type={props.type} className={classes} onClick={props.onClick}>{props.label}</button>
    )
}

export default Button;