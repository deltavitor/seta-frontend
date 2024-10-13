import "./Badge.scss"
import React from "react";
import classNames from "classnames";

type BadgeProps = {
    children: React.ReactNode;
    size?: "small";
    kind: "heavy" | "light";
    color: "blue" | "red" | "yellow" | "gray";
};

function Badge(props: BadgeProps) {

    const classes = classNames({
        "seta__badge": true,
        "seta__badge--sm": props.size === "small",
        // Kinds
        "seta__badge--heavy": props.kind === "heavy",
        "seta__badge--light": props.kind === "light",
        // Colors
        "seta__badge--blue": props.color === "blue",
        "seta__badge--red": props.color === "red",
        "seta__badge--yellow": props.color === "yellow",
        "seta__badge--gray": props.color === "gray",
    });

    return (
        <span className={classes}>
            {props.children}
        </span>
    );
}

export {
    Badge,
    BadgeProps,
};
