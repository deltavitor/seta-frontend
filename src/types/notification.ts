import type ClassificacaoFinal from "./classificacao-final";
import type CriterioConfirmacao from "./criterio-confirmacao";
import type ResultadoExame from "./resultado-exame";

interface Notification {

    numeroNotificacao: string;

    tipoNotificacao: string;

    codigoAgravo: string;

    dataNotificacao: Date;

    semanaEpidemiologicaNotificacao: string;

    codigoUfNotificacao: string;

    codigoMunicipioNotificacao: string;

    codigoUnidadeNotificacao: number;

    dataDiagnosticoSintoma: Date;

    semanaDiagnosticoSintoma: string;

    nomePaciente: string;

    dataNascimento: Date;

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

    dataInvestigacao: Date;

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

    dataColetaExame: Date;

    resultadoExame: ResultadoExame;

    dataColetaNs1: Date;

    resultadoNs1: ResultadoExame;

    dataColetaIsolamento: Date;

    resultadoIsolamento: ResultadoExame;

    dataColetaRtpcr: Date;

    resultadoRtpcr: ResultadoExame;

    sorotipo: string;

    evolucaoCaso: string;

    dataObito: Date;

    dataEncerramento: Date;

    observacao: string;

    // Custom SETA fields that are not part of Sinan
    numeroNotificationLocation: string;
}

export default Notification;
