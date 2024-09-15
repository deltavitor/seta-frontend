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

    classificacaoFinal: string;

    criterioConfirmacao: string;

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

    resultadoExame: string;

    dataColetaNs1: Date;

    resultadoNs1: string;

    dataColetaIsolamento: Date;

    resultadoIsolamento: string;

    dataColetaRtpcr: Date;

    resultadoRtpcr: string;

    sorotipo: string;

    evolucaoCaso: string;

    dataObito: Date;

    dataEncerramento: Date;

    observacao: string;

    // Custom SETA fields that are not part of Sinan
    numeroNotificationLocation: string;
}

export default Notification;
