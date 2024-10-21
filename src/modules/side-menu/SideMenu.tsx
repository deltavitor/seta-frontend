import "./SideMenu.scss";
import { Menu, Undo2 } from "lucide-react";
import { Button, MenuOption } from "../core";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteAllNotificationLocations, useDeleteAllNotifications } from "../../hooks";
import classNames from "classnames";

function SideMenu() {

    const queryClient = useQueryClient();
    const deleteAllNotifications = useDeleteAllNotifications();
    const deleteAllNotificationLocations = useDeleteAllNotificationLocations();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const deleteAllNotificationsAndNotificationLocations = async () => {
        await deleteAllNotificationLocations.mutateAsync().then(() => {
            deleteAllNotifications.mutateAsync().then(() => {
                queryClient.invalidateQueries();
            })
        });
    };

    const toggleMenu = () => {
        setIsVisible(!isVisible);
    };

    const classes = classNames({
        "seta__side-menu": true,
        "seta__side-menu--hidden": !isVisible,
    });

    return (
        <div style={{
            position: "absolute",
            zIndex: 1000,
            left: 8,
            top: 8,
            display: "inline-flex",
            gap: "1rem",
        }}>
            <Button kind={"primary"} iconOnly={true} title={"Menu"} onClick={toggleMenu}>
                <Menu size={20}/>
            </Button>
            <div className={classes}>
                <span className={"seta__side-menu__title"}>Menu</span>
                <MenuOption buttonOnly={true} onClick={deleteAllNotificationsAndNotificationLocations}>
                    <Undo2 size={18}/> Voltar para o início
                </MenuOption>
            </div>
        </div>
    );
}

export default SideMenu;
