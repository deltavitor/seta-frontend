import type ClassificacaoFinal from "./classificacao-final";
import type CriterioConfirmacao from "./criterio-confirmacao";
import type ResultadoExame from "./resultado-exame";

interface Notification {

    numeroNotificacao: string;

    tipoNotificacao: string;

    codigoAgravo: string;

    // The back-end returns a date in the format dd/mm/YYYY, which
    // isn't automatically parsed to a JS Date object
    dataNotificacao: string;

    semanaEpidemiologicaNotificacao: string;

    codigoUfNotificacao: string;

    codigoMunicipioNotificacao: string;

    codigoUnidadeNotificacao: number;

    dataDiagnosticoSintoma: string;

    semanaDiagnosticoSintoma: string;

    nomePaciente: string;

    dataNascimento: string;

    idade: number;

    sexo: string;

    idadeGestacional: string;

    racaCor: string;

    escolaridade: string;

    numeroCartaoSus: string;

    nomeMae: string;

    codigoUfResidencia: string;

    codigoMunicipioResidencia: string;

    codigoDistritoResidencia: string;

    codigoBairroResidencia: number;

    bairroResidencia: string;

    codigoLogradouroResidencia: number;

    logradouroResidencia: string;

    numeroResidencia: string;

    complementoResidencia: string;

    cepResidencia: string;

    dddResidencia: string;

    telefoneResidencia: string;

    zonaResidencia: string;

    codigoPaisResidencia: string;

    dataInvestigacao: string;

    classificacaoFinal: ClassificacaoFinal;

    criterioConfirmacao: CriterioConfirmacao;

    febre: boolean;

    mialgia: boolean;

    cefaleia: boolean;

    exantema: boolean;

    vomito: boolean;

    nausea: boolean;

    dorCostas: boolean;

    conjuntivite: boolean;

    artrite: boolean;

    artralgia: boolean;

    petequia: boolean;

    leucopenia: boolean;

    laco: boolean;

    dorRetro: boolean;

    diabetes: boolean;

    hematologicas: boolean;

    hepatopatias: boolean;

    renal: boolean;

    hipertensao: boolean;

    acidoPeptica: boolean;

    autoImune: boolean;

    dataColetaExame: string;

    resultadoExame: ResultadoExame;

    dataColetaNs1: string;

    resultadoNs1: ResultadoExame;

    dataColetaIsolamento: string;

    resultadoIsolamento: ResultadoExame;

    dataColetaRtpcr: string;

    resultadoRtpcr: ResultadoExame;

    sorotipo: string;

    evolucaoCaso: string;

    dataObito: string;

    dataEncerramento: string;

    observacao: string;

    // Custom SETA fields that are not part of Sinan
    numeroNotificationLocation: string;

    // Custom SETA fields that are used in the front-end
    dataNotificacaoParsed?: Date;
}

export default Notification;
