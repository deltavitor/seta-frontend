import type { Notification } from "../types";

type IdadeType = 1 | 2 | 3 | 4;

function parseNotificationIdade(idade: Notification["idade"]) {
    const idadeString = idade.toString();
    const idadeType = parseInt(idadeString[0], 10);
    const value = parseInt(idadeString.slice(1), 10);

    const singularTypes = {
        1: "hora",
        2: "dia",
        3: "mês",
        4: "ano",
    };
    const pluralTypes = {
        1: "horas",
        2: "dias",
        3: "meses",
        4: "anos",
    };

    return `${value} ${value === 1 ? singularTypes[idadeType as IdadeType] : pluralTypes[idadeType as IdadeType]}`;
}

export default parseNotificationIdade;
