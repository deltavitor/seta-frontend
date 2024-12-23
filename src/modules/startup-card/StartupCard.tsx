import "./StartupCard.scss";
import { Button } from "../core";
import { FormEvent, useRef, useState } from "react";
import { useAddNotifications } from "../../hooks";

function StartupCard() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File>();
    const addNotifications = useAddNotifications();

    const handleBrowseFilesButtonClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleFileChange = async () => {
        if (fileInputRef.current && fileInputRef.current.files)
            setFile(fileInputRef.current.files[0]);
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            addNotifications.mutate(formData);
        }
    };

    return (
        <div className={"seta__startup-card"}>
            <div className={"seta__startup-card__content"}>
                {
                    addNotifications.status === "idle" ?
                        <form encType={"multipart/form-data"} onSubmit={handleFormSubmit}>
                            <h1>Bem-vindo ao SETA-Dengue</h1>
                            <p>Faça o upload de um arquivo de notificações no formato DBF para começar</p>
                            <div className={"seta__startup-card__file-input"}>
                                <input
                                    ref={fileInputRef}
                                    type={"file"}
                                    aria-hidden={true}
                                    onChange={handleFileChange}
                                    style={{display: "none"}}
                                />
                                <Button kind={"secondary"} onClick={handleBrowseFilesButtonClick} type={"button"}>Escolher
                                    arquivo</Button>
                                <small>{file ? file.name : "Nenhum arquivo selecionado"}</small>
                            </div>
                            <Button kind={"primary"} type={"submit"}>Enviar</Button>
                        </form>
                    : addNotifications.status === "pending" || addNotifications.status === "success" ?
                        <div>
                            Carregando notificações...
                        </div>
                        : <div>
                            Ocorreu um erro. Por favor, contate costavitor@edu.unisinos.br
                        </div>
                }
            </div>
        </div>
    )
}

export default StartupCard;
