import "./Tooltip.scss";
import React from "react";
import classNames from "classnames";

type TooltipProps = {
    children?: React.ReactNode;
    hidden?: boolean;
};

function Tooltip(props: TooltipProps) {

    const classes = classNames({
        "seta__tooltip": true,
        "seta__tooltip--hidden": props.hidden,
    });

    return (
        <div className={classes}>
            {props.children}
            <div className={"seta__tooltip__pointer"}></div>
        </div>
    );
}

export default Tooltip;
