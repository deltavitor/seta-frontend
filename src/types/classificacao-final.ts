import { ClassificacoesFinais } from "../consts";

type ClassificacaoFinal = typeof ClassificacoesFinais[keyof typeof ClassificacoesFinais];

export default ClassificacaoFinal;
