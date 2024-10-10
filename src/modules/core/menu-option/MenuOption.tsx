import "./MenuOption.scss";
import React, { useState } from "react";
import { Check } from "lucide-react";

type MenuOptionProps = {
    children: React.ReactNode;
    checked: boolean;
    handleToggle?: (isChecked: boolean) => void;
};

function MenuOption(props: MenuOptionProps) {

    const [isChecked, setIsChecked] = useState(props.checked);

    const toggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        props.handleToggle && props.handleToggle(newCheckedState);
    };

    return (
        <button className={"seta__menu-option"} onClick={toggle}>
            {props.children}
            <Check className={"seta__menu-option__check-icon"} size={20} {...(isChecked ? {visibility: "visible"} : {visibility: "hidden"})}/>
        </button>
    );
}

export default MenuOption;
