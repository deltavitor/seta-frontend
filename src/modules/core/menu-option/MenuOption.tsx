import "./MenuOption.scss";
import React from "react";
import { Check } from "lucide-react";

type MenuOptionProps = {
    children: React.ReactNode;
    checked?: boolean;
    handleToggle?: (isChecked: boolean) => void;
};

function MenuOption(props: MenuOptionProps) {

    const [isChecked, setChecked] = React.useState(props.checked || false);

    const toggle = () => {
        const newIsChecked = !isChecked;
        setChecked(newIsChecked);
        props.handleToggle && props.handleToggle(newIsChecked);
    };

    return (
        <button className={"seta__menu-option"} onClick={toggle}>
            {props.children}
            <Check className={"seta__menu-option__check-icon"} size={20} {...(isChecked ? {visibility: "visible"} : {visibility: "hidden"})}/>
        </button>
    );
}

export default MenuOption;
