import "./MenuOption.scss";
import React from "react";
import { Check } from "lucide-react";

type MenuOptionProps = {
    children: React.ReactNode;
    checked: boolean;
    handleToggle?: (isChecked: boolean) => void;
};

function MenuOption(props: MenuOptionProps) {

    const toggle = () => {
        props.handleToggle && props.handleToggle(!props.checked);
    };

    return (
        <button className={"seta__menu-option"} onClick={toggle}>
            {props.children}
            <Check className={"seta__menu-option__check-icon"} size={20} {...(props.checked ? {visibility: "visible"} : {visibility: "hidden"})}/>
        </button>
    );
}

export default MenuOption;
