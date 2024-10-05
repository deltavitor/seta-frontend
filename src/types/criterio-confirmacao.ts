import { CriteriosConfirmacao } from "../consts";

type CriterioConfirmacao = typeof CriteriosConfirmacao[keyof typeof CriteriosConfirmacao];

export default CriterioConfirmacao;
