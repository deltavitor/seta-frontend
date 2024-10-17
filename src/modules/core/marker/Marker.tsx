import "./Marker.scss"
import React from "react";
import colors from "../../../styles/colors.module.scss";
import classNames from "classnames";

type MarkerProps = {
    markerSize: number;
    shape: "circle" | "diamond";
    color: "red" | "blue" | "yellow" | "white";
    label?: string;
    isBlurred?: boolean;
};

function Marker(props: MarkerProps) {

    const { markerSize } = props;
    const strokeWidth = 2;
    const circleX = markerSize / 2;
    const circleY = markerSize / 2;
    const circleRadius = ( markerSize - strokeWidth) / 2;
    const diamondPoints = `${markerSize / 2},0 ${markerSize},${markerSize / 2} ${markerSize / 2},${markerSize} 0,${markerSize / 2}`;

    const classes = classNames({
        "seta__marker--blurred": props.isBlurred,
    });

    return (
        <svg className={classes} width={markerSize} height={markerSize} viewBox={`0 0 ${markerSize} ${markerSize}`} xmlns="http://www.w3.org/2000/svg">
            {props.shape === "diamond" && <polygon points={diamondPoints} fill={colors[props.color]} stroke={colors.white} strokeWidth={strokeWidth}/>}
            {props.shape === "circle" && <circle cx={circleX} cy={circleY} r={circleRadius} fill={colors[props.color]} stroke={colors.white} strokeWidth={strokeWidth}/>}
            {props.label && <text className="seta__marker__label" x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" dy=".3em">{props.label}</text>}
        </svg>
    )

}

export {
    Marker,
    MarkerProps
};
