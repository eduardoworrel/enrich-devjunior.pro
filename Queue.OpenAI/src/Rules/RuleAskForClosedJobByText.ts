export function getAiRule(text : string) {
  return `
    Dado o seguinte trecho de um site de vaga de emprego
    responda com 1 caso exista evidencia de vaga encerrada 
    ou não aceitando candidatura ou inscrição
    e 0 para caso esteja sem eviencia:
    "${text}"
  `
}